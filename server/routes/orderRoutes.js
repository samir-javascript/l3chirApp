import express from "express"
import { protect, admin } from "../middlewares/authMiddleware.js";
import { addNewOrder, calculateTotalOrdersRevenueByMonth, getActiveMonthlyOrders, getMyOrders, getOrderById, getOrders, updateStatus } from "../controllers/orderController.js";
const router = express.Router()
router.route("/add-order").post(protect,  addNewOrder)
router.route('/:id').get(getOrderById)
router.route("/myorders/:id").get(protect,getMyOrders)
router.route('/update_orderStatus').put(protect,admin,updateStatus)
router.route('/getActiveOrders/month').get(protect,admin,getActiveMonthlyOrders)
router.route('/getOrdersRevenue/month').get(protect,admin,calculateTotalOrdersRevenueByMonth)
router.route("/").get(getOrders)
export default router;
