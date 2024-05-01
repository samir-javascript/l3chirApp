import { ApiSlice } from "./ApiSlice";
const USERS_URL = "/api/users"
export const usersSlice = ApiSlice.injectEndpoints({
    endpoints: (builder)=> ({
       authUser: builder.mutation({
         query: (data)=> ({
             url: `${USERS_URL}/auth`,
             method: "POST",
             body: {...data}
         })
       }),
       getWishlistItems: builder.query({
        query: ()=> ({
            url: `${USERS_URL}/get_mywishlist_items`,
        }),
        keepUnusedDataFor: 5
      }),
      updateProfile: builder.mutation({
        query: (data)=> ({
            url: `${USERS_URL}/update_myprofile`,
            method: "PUT",
            body: {...data}
        }),
       providesTags: ["User"]
      }),
       // /update_myprofile
       registerUser: builder.mutation({
        query: (data)=> ({
            url: `${USERS_URL}/register`,
            method: "POST",
            body: {...data}
        })
      }),
      logoutUser: builder.mutation({
        query: ()=> ({
            url: `${USERS_URL}/logout`,
            method: "POST",
           
        })
      }),
      resetPassword: builder.mutation({
        query: (data)=> ({
            url: `${USERS_URL}/reset_password-request`,
            method: "POST",
            body: {...data}
        })
      }),
      changeForgotPassword: builder.mutation({
        query: (data)=> ({
            url: `${USERS_URL}/verify-password-reset-token`,
            method: "PUT",
            body: {...data}
        })
      }),
      toggleWishlist: builder.mutation({
        query: (data)=> ({
            url: `${USERS_URL}/add-to_wishlist`,
            method: "POST",
            body: {...data}
        })
      }),
      updateProfilePicture:builder.mutation({
        query:(data)=> ({
           url: `${USERS_URL}/update-profile_image`,
           method: "PUT",
           body: data
        }),
       providesTags: ["User"]
      }) ,
      getCurrentUser: builder.query({
        query: ()=> ({
            url: `${USERS_URL}/get-current_user`,
            
        }),
        
        keepUnusedDataFor : 5
      }),
      changePassword: builder.mutation({
        query: (data)=> ({
            url: `${USERS_URL}/change-password`,
             method: "PUT",
             body: {...data}
        }),
        
       providesTags: ['User']
      }),
      getUsers: builder.query({
        query: ({pageNumber})=> ({
            url: `${USERS_URL}/get-allUsers`,
            params: {
               pageNumber
            }
        }),
        keepUnusedDataFor: 5
        
      
      }),
      saveUserData: builder.mutation({
        query: (data)=> ({
            url: `${USERS_URL}/save-personal_data`,
             method: "PUT",
             body: {...data}
        }),
        
       providesTags: ['User']
      }),
      deleteUser: builder.mutation({
        query: (data)=> ({
            url: `${USERS_URL}/delete_user`,
             method: "DELETE",
             body: {...data}
        }),
        
       providesTags: ['User']
      }),
      updateUsers: builder.mutation({
        query: (data)=> ({
            url: `${USERS_URL}/update-users`,
             method: "PUT",
             body: {...data}
        }),
        
       providesTags: ['User']
      }),
      getUserById: builder.query({
        query: (id)=> ({
            url: `${USERS_URL}/getUser/${id}`,
            
        }),
        
       keepUnusedDataFor : 5
      }),
      getUsersWithOrders: builder.query({
        query: ()=> ({
            url: `${USERS_URL}/users_with-orders`,
            
        }),
        
      // /users_with-orders
      
     keepUnusedDataFor : 5
    }),
    usersByMonth: builder.query({
      query: ()=> ({
          url: `${USERS_URL}/getActive_users/months`,
          
      }),
      
   
    
   keepUnusedDataFor : 5
  }),
      
    })

    // /getActive_users/months
})
export const { useAuthUserMutation, useGetUsersWithOrdersQuery, useUsersByMonthQuery, useGetUserByIdQuery, useDeleteUserMutation, useUpdateUsersMutation, useGetUsersQuery, useSaveUserDataMutation, useChangePasswordMutation, useUpdateProfilePictureMutation, useUpdateProfileMutation, useGetWishlistItemsQuery, useGetCurrentUserQuery, useToggleWishlistMutation, useRegisterUserMutation, useLogoutUserMutation, useResetPasswordMutation, useChangeForgotPasswordMutation} = usersSlice