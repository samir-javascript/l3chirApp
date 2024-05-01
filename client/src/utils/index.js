/* eslint-disable no-unused-vars */
export const addDecimals = (num)=> {
    return (Math.round(num * 100) / 100).toFixed(2)
 }
 
 export const updateCart = (state,action)=> {
    const itemsPrice =   action?.payload?.price * action?.payload?.quantity;
    state.itemsPrice = addDecimals(itemsPrice);
 
    localStorage.setItem('l3chir_products', JSON.stringify(state));
    return state;
 }
 