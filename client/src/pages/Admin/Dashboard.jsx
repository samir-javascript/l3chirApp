import AdminNavbar from "@/components/shared/AdminDashboardBoxes/AdminNavbar"
import { AdminSidebar } from "@/components/shared/AdminDashboardBoxes/AdminSidebar"
import { useState } from "react"
import { MdGroups } from "react-icons/md";
import { FaMoneyCheck, FaShopify, FaShoppingCart } from "react-icons/fa"
import { userschartData, orderschartData, revenuechartData } from "@/constants"
import TopBox from "@/components/shared/AdminDashboardBoxes/TopBox"
import UserBox from "@/components/shared/AdminDashboardBoxes/UserBox"
import { useGetUsersQuery , useUsersByMonthQuery} from "@/slices/UsersApiSlice"
import { useGetActiveMonthlyOrdersQuery, useGetOrdersQuery , useGetOrdersRevenueByMonthQuery} from "@/slices/ordersApiSlice"
import { useGetProductsQuery, useGetStatesQuery } from "@/slices/ProductsApiSlice";
import { useLocation } from "react-router-dom";
import Pie from "@/components/shared/AdminDashboardBoxes/Pie";
import OverViewChart from "@/components/shared/AdminDashboardBoxes/OverViewChart";
const Dashboard = () => {
  const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const pageNumber = searchParams.get("pageNumber")
    const [open,setOpen] = useState(false)
    const {data:orders} = useGetOrdersQuery()
    const {data:productsData} = useGetProductsQuery({pageNumber})
     const {data:usersCount, isLoading:fetching} = useGetUsersQuery({pageNumber:1})
     const {data: usersByMonth} = useUsersByMonthQuery()
     const {data: ordersByMonth } = useGetActiveMonthlyOrdersQuery()
     const {data: ordersRevenueByMonth} = useGetOrdersRevenueByMonthQuery()
     const { data: statsData, isLoading } = useGetStatesQuery()
    // #101538
    const total = orders && orders.orders.reduce((acc,item)=> acc + item.totalPrice, 0)
  if(usersByMonth)  {
    usersByMonth.forEach(({_id,count})=> {
       const monthIndex = _id - 1;
       if(monthIndex >= 0 && monthIndex < userschartData.length) {
        userschartData[monthIndex].users = count;
       }
    })
  }
  if(ordersByMonth)  {
    ordersByMonth.forEach(({_id,count})=> {
       const monthIndex = _id - 1;
       if(monthIndex >= 0 && monthIndex < orderschartData.length) {
        orderschartData[monthIndex].orders = count;
       }
    })
  }
  if(ordersRevenueByMonth)  {
    ordersRevenueByMonth.forEach(({_id,totalRevenue})=> {
       const monthIndex = _id - 1;
       if(monthIndex >= 0 && monthIndex < revenuechartData.length) {
        revenuechartData[monthIndex].revenue = totalRevenue;
       }
    })
  }
  if(isLoading || fetching) return "Loading..."
  console.log(usersCount, "users")
  return (
    <div className="flex w-full h-full bg-[#101538] flex-col">
        <AdminNavbar open={open} setOpen={setOpen} />
        <AdminSidebar open={open} setOpen={setOpen} />
        <div className="w-full home py-5">
             <div className="box box1">
              <TopBox />
             </div>
             <div className="box box2">
                <UserBox  
                   title="total users"
                   route="/admin/usersList"
                   icon={<MdGroups size={35} color="white" />}
                   dataKey="users"
                   value={usersCount && usersCount?.count}
                   chartData={userschartData}
                />
             </div>
             <div className="box box3"> <UserBox 
               dataKey="products"
               icon={<FaShoppingCart  size={30} color="white" />}
                title="total products"
                value={productsData && productsData?.count}
                chartData={ [
                  {
                    name: 'Lun',
                    products: 4000,
                    
                  },
                  {
                    name: 'Mar',
                    products: 4000,
                    
                  },
                  {
                    name: 'Mer',
                    products: 4200,
                    
                  },
                  {
                    name: 'Jeu',
                    products: 2000,
                   
                  },
                  {
                    name: 'Ven',
                    products: 6000,
                    
                  },
                  {
                    name: 'Sam', 
                    products: 6000,
                   
                  },
                  {
                    name: 'Dim',
                    products: 7500,
                   
                  },
                ]} 
               
                 route='/admin/productsList' /></div>
             {/* <div className="box box4">box4</div> */}
             <div className="box box5"><UserBox 
              title="total orders"
              icon={<FaShopify size={35} color="white" />}
              chartData={orderschartData}
              value={orders && orders?.count}
              route="/admin/ordersList"
              dataKey="orders"
             
             /></div>
             <div className="box box6"><UserBox 
               title="total revenue"
               route="/admin/overview"
               icon={<FaMoneyCheck size={35} color="white" />}
               value={total !== undefined && total.toFixed(2)}
               chartData={revenuechartData}
               dataKey="revenue" 
             
             /></div>
             <div className="box box7 sm:block hidden"> 
             <OverViewChart data={statsData} view="sales" isDashboard />
               </div>
             <div className="box box8">
               <Pie  isDashboard={true} />
             </div>
             <div className="box box1 sm:hidden block">
              <OverViewChart data={statsData} isDashboard view="sales" />
             </div>
        </div>
    </div>
  )
}

export default Dashboard