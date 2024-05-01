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
      // /getProducts_byCategory/:categoryName
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
    })
    ///delete-product/:id
})
export const {useCreateNewProductMutation , useGetStatesQuery, useGetProductsByCategoryQuery, useDeleteProductMutation,  useUpdateProductMutation, useGetProductsQuery, useGetProductByIdQuery } = productsSlice