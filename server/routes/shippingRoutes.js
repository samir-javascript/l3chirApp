import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { addTestimoniolReview, createShipping, deleteShippingAddress, editShipping, getShippingAddress, getTestimoniols } from '../controllers/shippingController.js'
const router = express.Router()
router.route("/add-shipping_address").post(protect,createShipping)
router.route("/delete-shipping_address").delete(protect,deleteShippingAddress)
router.route("/edit-shipping_address").put(protect,editShipping)
router.route("/get-shipping_address").get(protect,getShippingAddress)
router.route("/add-social_review").post(protect,addTestimoniolReview)
router.route('/get-social_proof').get(getTestimoniols)
export default router