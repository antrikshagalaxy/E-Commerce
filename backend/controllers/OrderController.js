import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const currency = "inr"
const deliveryCharge = 10
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        })
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({ success: true, message: "Order placed successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Order not placed" })
    }
}

const placeOrderStripe = async (req, res) => {
    try {
        if (!stripe) {
            return res.json({ success: false, message: "Stripe API key is missing. Please configure STRIPE_SECRET_KEY in backend/.env" });
        }

        const { userId, items, amount, address } = req.body
        const { origin } = req.headers;
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        })
        await newOrder.save()
        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "delivery charge",
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({ success: true, session_url: session.url })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Order not placed" })
    }
}

const verifyStripe = async (req, res) => {
    try {
        const { orderId, success, userId } = req.body;
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: "Payment Successful" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error verifying payment" });
    }
}

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({
            $or: [
                { paymentMethod: "COD" },
                { payment: true }
            ]
        })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Orders not found" })
    }
}


const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({
            userId: req.body.userId,
            $or: [
                { paymentMethod: "COD" },
                { payment: true }
            ]
        })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Orders not found" })
    }
}


const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Order updated successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Order not updated" })
    }
}


export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe }