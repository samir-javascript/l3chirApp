import { ApiSlice } from "./ApiSlice";
const PRODUCTS_URL = "/api/products"
export const productsSlice = ApiSlice.injectEndpoints({
    endpoints: (builder)=> ({
      
      createNewProduct: builder.mutation({
        query: (data)=> ({
            url: `${PRODUCTS_URL}/create-product`,
            method: "POST",
            body: {...data}
        })
      }),
      getProductsByCategory: builder.query({
        query: (categoryName)=> ({
            url: `${PRODUCTS_URL}/getProducts_byCategory/${categoryName}`,
           
        }),
        keepUnusedDataFor: 5
      }),
      getRecommendedProducts: builder.query({
        query: (id)=> ({
            url: `${PRODUCTS_URL}/getRecommended_products/${id}`,
           
        }),
        keepUnusedDataFor: 5
      }),
      // /getRecommended_products/:id
      getProducts: builder.query({
        query: ({pageNumber})=> ({
            url:  PRODUCTS_URL,
            params: {
              pageNumber
            }
        }),
        keepUnusedDataFor : 5
      }),
      getStates: builder.query({
        query: ()=> ({
            url: `${PRODUCTS_URL}/getProducts/stats`,
        }),
        keepUnusedDataFor : 5
      }),
      // /getProducts/stats
     getProductById: builder.query({
        query: (id)=> ({
            url:  `${PRODUCTS_URL}/${id}`,
        }),
        keepUnusedDataFor : 5
      }),
      updateProduct: builder.mutation({
        query: (data)=> ({
            url:  `${PRODUCTS_URL}/update-product`,
            method: "PUT",
            body: {...data}
        }),
        providesTags: ['Product']
      }),
      deleteProduct: builder.mutation({
        query: (data)=> ({
            url:  `${PRODUCTS_URL}/delete-product`,
            method: "DELETE",
            body: {...data}
        }),
        providesTags: ['Product']
      }),
      addProductReview: builder.mutation({
        query: (data)=> ({
            url:  `${PRODUCTS_URL}/create-product_review`,
            method: "POST",
            body: {...data}
        }),
        providesTags: ['Product']
      }),
    })
    // /create-product_review
})
export const {useCreateNewProductMutation , useGetRecommendedProductsQuery,  useAddProductReviewMutation, useGetStatesQuery, useGetProductsByCategoryQuery, useDeleteProductMutation,  useUpdateProductMutation, useGetProductsQuery, useGetProductByIdQuery } = productsSlice