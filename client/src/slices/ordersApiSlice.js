import { ApiSlice } from "./ApiSlice";
const ORDERS_URL = "/api/orders"
export const ordersSlice = ApiSlice.injectEndpoints({
    endpoints: (builder)=> ({
      
      createNewOrder: builder.mutation({
        query: (data)=> ({
            url: `${ORDERS_URL}/add-order`,
            method: "POST",
            body: {...data}
        })
      }),
      
      getOrders:builder.query({
        query:()=> ({
           url: ORDERS_URL,
        }),
        keepUnusedDataFor :5
      }) ,
      getMyOrders:builder.query({
        query:(id)=> ({
           url: `${ORDERS_URL}/myorders/${id}`,
        }),
        keepUnusedDataFor :5
      }) ,
      getOrderById:builder.query({
        query:(id)=> ({
           url: `${ORDERS_URL}/${id}`,
        }),
        keepUnusedDataFor :5
      }) ,
      updateOrderStatus:builder.mutation({
        query:(data)=> ({
           url: `${ORDERS_URL}/update_orderStatus`,
           method: "PUT",
           body: {...data}
        }),
        providesTags: ["Order"]
      }) ,
      getActiveMonthlyOrders:builder.query({
        query:()=> ({
           url: `${ORDERS_URL}/getActiveOrders/month`,
           
        }),
        keepUnusedDataFor: 5
      }) ,
      getOrdersRevenueByMonth:builder.query({
        query:()=> ({
           url: `${ORDERS_URL}/getOrdersRevenue/month`,
           
        }),
        keepUnusedDataFor: 5
      }) ,
     
    })
    // /getOrdersRevenue/month
})
export const {useCreateNewOrderMutation , useGetOrdersRevenueByMonthQuery, useGetActiveMonthlyOrdersQuery, useUpdateOrderStatusMutation, useGetMyOrdersQuery,  useGetOrderByIdQuery, useGetOrdersQuery} = ordersSlice