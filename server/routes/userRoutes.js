import express from 'express'
import { admin, protect} from "../middlewares/authMiddleware.js"
import {  authUser, changePassword, deleteUser, getAllUsers, getCurrentUser, getMonthlyActiveUsers, getUserById, getUsersWithOrders, logOutUser, registerUser, savePersonalData, updateImageProfile, updateMyProfile, updateUsers, verifyPasswordReseyToken, verifyToken } from '../controllers/userController.js';
import { getWishlistItems, toogleWishlist } from '../controllers/wishlistController.js';

const router = express.Router()
router.route('/auth').post(authUser)
router.route('/register').post(registerUser)
router.route('/get-allUsers').get(protect,admin,getAllUsers)
router.route("/delete_user").delete(protect,admin,deleteUser)
router.route("/update-users").put(protect,admin,updateUsers)
router.route("/getUser/:id").get(getUserById)
router.route("/logout").post(logOutUser)

router.route("/addToWishlist").post(protect,toogleWishlist)

router.route("/update_myprofile").put(protect, updateMyProfile)
router.route('/reset_password-request').post(verifyToken)
router.route('/get_mywishlist_items').get(protect,getWishlistItems)
router.route('/get-current_user').get(protect,getCurrentUser)
router.route('/verify-password-reset-token').put(verifyPasswordReseyToken)
router.route("/update-profile_image").put(protect,updateImageProfile)
router.route("/change-password").put(protect,changePassword)
router.route('/getActive_users/months').get(protect,admin, getMonthlyActiveUsers)
router.route("/save-personal_data").put(protect,savePersonalData)
router.route("/users_with-orders").get(protect,admin,getUsersWithOrders)
export default router;