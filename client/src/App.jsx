
import { Routes, Route } from 'react-router-dom'

import Home from './pages/HomePage/Home'
import ProductDetails from './pages/ProductDetailsPage/ProductDetails'
import AdminRoutes from './components/shared/AdminDashboardBoxes/AdminRoutes'
import PasswordReset from './pages/PasswordResetaPage/PasswordReset'
import Dashboard from './pages/Admin/Dashboard'
import Layout from './components/layoutComponent/Layout'
import ProductsList from './pages/Admin/ProductsList'
import Cart from './pages/cartPage/Cart'
import Wishlist from './pages/WishlistPage/Wishlist'
import Profile from './pages/profilePage/Profile'
import Shipping from './pages/shippingPage/Shipping'
import UsersList from './pages/Admin/UsersList'
import OrdersList from './pages/Admin/OrdersList'
import Payment from './pages/PaymentPage/Payment'
import CustomerSettingAccount from './pages/CustomerPage/CustomerSettingAccount'
import MyOrders from './pages/CustomerOrdersPage/MyOrders'
import CustomerAddress from './pages/CustomerAddressPage/CustomerAddress'
import OrderDetails from './pages/orderDetailsPage/OrderDetails'
import Category from './pages/CategoriesPage/Category'
import ProtectedRoutes from './components/shared/ProtectedRoutes'
import SignUp from './pages/SignUpPage/SignUp'
import BreakDown from './pages/Admin/BreakDown'
import Monthly from './components/shared/AdminDashboardBoxes/Monthly'
import Overview from './components/shared/AdminDashboardBoxes/Overview'
import Daily from './components/shared/AdminDashboardBoxes/Daily'


function App() {
 

  return (
    <>
      <div className='w-full h-full flex flex-col'>
            
            <main className='flex-1'>
                 <Routes>
                  {/* admin routes */}
                 
                      {/* protected routes */}
                  <Route path="" element={<Layout />} >
                  <Route path="" element={<AdminRoutes />} >
                    <Route path='/admin/usersList' element={<UsersList />} />
                    <Route path='/admin/ordersList' element={<OrdersList />} />
                    <Route path='/admin/productsList' element={<ProductsList />} />
                    <Route path='/admin/breakdown' element={<BreakDown />} />
                    <Route path='/admin/monthlySales' element={<Monthly />} />
                    <Route path='/admin/dashboard' element={<Dashboard />} />
                    <Route path='/admin/overview' element={<Overview />} />
                    <Route path='/admin/dailySales' element={<Daily />} />
                  </Route>
                  <Route path="" element={<ProtectedRoutes />} >
                  <Route path='/browse_wishlist-items' element={<Wishlist />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/shipping' element={<Shipping />} />
                   
                    <Route path='/payment/:id/thank_you' element={<Payment />} />
                    <Route path='/customer/account/edit' element={<CustomerSettingAccount />} />
                    <Route path='/sales/history' element={<MyOrders />} />
                    <Route path='/sales/history/view/command_id/:id' element={<OrderDetails />} />
                    <Route path='/customer/address' element={<CustomerAddress />} />
                  </Route>
                    <Route index path="/" element={<Home />} />
                    <Route path='/food_product/:id' element={<ProductDetails />} />
                    <Route path='/reset_password' element={<PasswordReset />} />
                  
                   
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/sign-up' element={<SignUp />} />
                   
                   
                   
                    <Route path='/browse_categories' element={<Category />} />
                    {/* /customer/address */}
                    </Route>
                 </Routes>
            </main>
           
      </div>
    </>
  )
}

export default App
