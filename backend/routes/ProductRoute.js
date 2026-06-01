import express from 'express'
import { addproduct, listproduct, removeproduct, singleproduct } from '../controllers/ProductController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'




const ProductRoute = express.Router();

ProductRoute.post("/add", adminAuth, upload.fields([{ name: "image1", maxCount: 1 }, { name: "image2", maxCount: 1 }, { name: "image3", maxCount: 1 }, { name: "image4", maxCount: 1 }]), addproduct);
ProductRoute.post("/remove", removeproduct);
ProductRoute.post("/single", singleproduct);
ProductRoute.get("/list", listproduct);



export default ProductRoute;