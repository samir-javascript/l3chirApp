import { ApiSlice } from "./ApiSlice";
const SHIPPING_URL = "/api/shipping"
export const shippingSlice = ApiSlice.injectEndpoints({
    endpoints: (builder)=> ({
      
      addNewShipping_address: builder.mutation({
        query: (data)=> ({
            url: `${SHIPPING_URL}/add-shipping_address`,
            method: "POST",
            body: {...data}
        })
      }),
      deleteShipping_address: builder.mutation({
        query: ()=> ({
            url: `${SHIPPING_URL}/delete-shipping_address`,
            method: "DELETE",
            
        })
      }),
      addTestimonoil: builder.mutation({
        query: (data)=> ({
            url: `${SHIPPING_URL}/add-social_review`,
            method: "POST",
            body: {...data}    
        }),
        providesTags: ['Shipping']
      }),
      // /add-social_review
      editShipping_address: builder.mutation({
        query: (data)=> ({
            url: `${SHIPPING_URL}/edit-shipping_address`,
            method: "PUT",
            body:  {...data}
            
        }),
        providesTags: ["Shipping"]
      }),
      getShipping_address: builder.query({
        query: ()=> ({
            url: `${SHIPPING_URL}/get-shipping_address`,
        })
      }),
      getReviews: builder.query({
        query: ()=> ({
            url: `${SHIPPING_URL}/get-social_proof`,
        }),
        keepUnusedDataFor : 5
      }),
      
      
    })
    // /get-social_proof
})
export const {useAddNewShipping_addressMutation, useGetReviewsQuery, useAddTestimonoilMutation, useEditShipping_addressMutation, useDeleteShipping_addressMutation, useGetShipping_addressQuery} = shippingSlice