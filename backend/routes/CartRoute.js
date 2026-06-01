import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/CartController.js'
import authUser from '../middleware/Auth.js'
const CartRoute = express.Router()

CartRoute.post('/add', authUser, addToCart)
CartRoute.post('/update', authUser, updateCart)
CartRoute.post('/get', authUser, getUserCart)

export default CartRoute