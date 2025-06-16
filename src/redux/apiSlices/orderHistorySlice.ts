import { api } from "../api/baseApi";

const OrderHistorySlice = api.injectEndpoints({
    endpoints: (builder) => ({
        mealOrderHistory: builder.query({
            query: () => {
                return{
                    method: "get",
                    url: `/meal-plan-order/history`,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
        menuOrderHistory: builder.query({
            query: () => {
                return{
                    method: "GET",
                    url: `/order/history`,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        })
    })
});

export const { 
    useMealOrderHistoryQuery,
    useMenuOrderHistoryQuery
} = OrderHistorySlice;