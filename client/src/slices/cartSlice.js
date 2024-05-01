/* eslint-disable no-unused-vars */
import { updateCart } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
const initialState = localStorage.getItem("l3chir_products") ? JSON.parse(localStorage.getItem("l3chir_products")) : {cartItems: [], shippingAddress: {}}
const cartSlice = createSlice({
     initialState,
     name: "cart",
     reducers: {
        addToCart:(state,action)=> {
      
         const {...item} = action.payload;
              
         const existingItem = state.cartItems.find(
          (x) => x.sizeState === item.sizeState && x._id === item._id
        );
         
         if (existingItem) {
          // Item already exists, update quantity and extras
          existingItem.quantity += item.quantity; // Increase quantity
  
          // Check and add new extras
          if (item.extras && item.extras.length > 0) {
            item.extras.forEach((extra) => {
              // Check if the extra is already present in the existing item's extras
              const isExistingExtra = existingItem.extras.find((existingExtra) => existingExtra._id === extra._id);
  
              if (!isExistingExtra) {
                // Add the new extra to existing item's extras
                existingItem.extras.push(extra);
              }
            });
          }
        } else {
             state.cartItems = [...state.cartItems, item];
           }
      
    
      return updateCart(state,action,item)
        },
        increaseQuantity: (state, action) => {
         const { sizeState, _id } = action.payload;
         const itemToUpdate = state.cartItems.find((item) => item.sizeState === sizeState && item._id === _id);
         if (itemToUpdate) {
           itemToUpdate.quantity += 1;
           return updateCart(state, action); // Update cart after increasing quantity
         }
       },
       decreaseQuantity: (state, action) => {
         const { sizeState , _id} = action.payload;
         const itemToUpdate = state.cartItems.find(
          (x) => x.sizeState === sizeState && x._id === _id
        );
         if (itemToUpdate && itemToUpdate.quantity > 1) {
           itemToUpdate.quantity -= 1;
           return updateCart(state, action)} // Update cart after decreasing quantity
        //  } else if (itemToUpdate && itemToUpdate.quantity === 1) {
        //    // Remove item from cart if quantity becomes zero
        //    state.cartItems = state.cartItems.filter((item) => item.sizeState !== sizeState);
        //    return updateCart(state, action); // Update cart after removing item
        //  }
       },
       removeFromCart: (state, action) => {
        const { sizeState, _id } = action.payload;
      
        // Filter out the item with matching _id and sizeState
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== _id 
        );
      
        return updateCart(state, action);
      },
      saveShippingAddress: (state, action) => {
       state.shippingAddress = action.payload;
      
        return updateCart(state, action);
      },
      clearShippingAddress: (state, action) => {
        state.shippingAddress = {};
       
         return updateCart(state, action);
       },
      clearCart: (state,action)=> {
         state.cartItems = [];
         return updateCart(state,action)
      },
      reset: (state,action)=> (state = null)
       
     }
     // fp.filter(item => item.sizeState !== sizeState)
     // filter(item => item._id !== _id && item.sizeState !== sizeState)
   });
   
   export const { addToCart, reset, increaseQuantity, clearShippingAddress, clearCart, saveShippingAddress, decreaseQuantity, removeFromCart } = cartSlice.actions;
   export default cartSlice.reducer;
   

       
   


