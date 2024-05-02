import express from 'express'
import { createProduct, createReview, deleteProduct, getProductById, getProducts, getProductsByCategory, getRecommendedProducts, getStats, updateProduct } from '../controllers/productController.js';
import { protect , admin } from '../middlewares/authMiddleware.js';
const router = express.Router()
router.route('/:id').get(getProductById)
router.route('/').get(getProducts)
// this route should be prvate
router.route('/update-product').put(protect, admin,updateProduct)
// also this one;
router.route('/getProducts/stats').get(protect,admin,getStats)
router.route("/delete-product").delete(protect, admin, deleteProduct)
// also this one;
router.route('/getRecommended_products/:id').get(getRecommendedProducts)
router.route('/create-product_review').post(protect,createReview)
router.route('/create-product').post(protect, admin, createProduct)
router.route('/getProducts_byCategory/:categoryName').get(getProductsByCategory)
export default router;