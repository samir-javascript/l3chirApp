import { configureStore } from '@reduxjs/toolkit'
import { ApiSlice } from './slices/ApiSlice'
import  authSliceReducer from './slices/usersSlice'
import cartSlice from './slices/cartSlice'
export const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]:ApiSlice.reducer,
    auth: authSliceReducer,
    cart: cartSlice

  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(ApiSlice.middleware),
  devTools: true
})