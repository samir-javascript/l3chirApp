import { fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react"
const baseQuery = fetchBaseQuery({baseUrl: ""});
export const ApiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['Product','User', 'Order', "Shipping"],
    endpoints:()=> ({})
 });