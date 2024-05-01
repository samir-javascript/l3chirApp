import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";
//import Shipping from "../models/shippingModel.js";

// send email to order holder after the order request is done
export const addNewOrder = asyncHandler (async(req,res)=> {
  
        const { totalPrice,  status, shippingAddress,  orderItems, } = req.body;
      
        const order = await Order.create({
            user: req.user._id,
            status,
            orderItems: orderItems.map((order)=> ({
                ...order,
                _id: undefined,
                product: order._id
            })),
            shippingAddress,
            totalPrice
        })
        if(!order)  {
            throw new Error('Failed to creare new order')
        }
        res.status(201).json(order)
     
})

export const getOrders = asyncHandler( async(req,res)=>  {
     
        const count = await Order.countDocuments({})
         const orders = await Order.find({})
         .populate("user")
         if(!orders) {
            res.status(404)
            throw new Error('No Order was found')
         }
         res.status(200).json({orders,count})
    
})
export const getMyOrders = asyncHandler (async(req,res)=> {
    const {id} = req.params;
  
        const orders = await Order.find({user: id})
        .populate("orderItems.product")
        if(!orders) {
            res.status(404)
            throw new Error('This user has no orders yet')
        }
        res.status(200).json(orders)
    
})
export const getOrderById = asyncHandler (async(req,res)=>  {
       
        const order = await Order.findById(req.params.id)
        if(!order) {
            res.status(404)
            throw new Error('No Order was found')
        }
        res.status(200).json(order)
   
})

export const updateStatus = asyncHandler (async(req,res)=> {
    const { status , orderId} = req.body;
   
        const order = await Order.findById(orderId)
        if(order) {
            order.status = status;
            if(status === "delivered") {
                order.deliveredAt = Date.now();
            }
            const updatedOrder = await order.save()
            res.status(200).json(updatedOrder)
        }else {
            res.status(404)
            throw new Error('No order was found')
        }
   
}
)




// get active  Orders by month
// admin only
// ROUTE: /getActiveOrders/month
// GET REQUEST

export const getActiveMonthlyOrders = asyncHandler( async(req,res)=> {
   
        const ordersCountByMonth = await Order.aggregate([
            {
                $group: {
                    _id: {$month: "$createdAt"},
                    count: {$sum: 1}
                },
               
            },
            { $sort: { '_id': 1 } }
        ])
        res.status(200).json(ordersCountByMonth)
    
})




// calculate orders revenue by month,
// admin only;
// ROUTE: /getOrdersRevenue/month
// GET REQUEST

export const calculateTotalOrdersRevenueByMonth = asyncHandler (async(req,res)=> {
    
        const ordersTotalRevenueByMonth = await Order.aggregate([
            {
              $group: {
                _id: { $month: '$createdAt' }, // Group by month (1 to 12)
                totalRevenue: { $sum: '$totalPrice' } // Calculate total revenue for each month
              }
            },
            { $sort: { '_id': 1 } } // Sort results by month
          ]);
        res.status(200).json(ordersTotalRevenueByMonth)
    
})
