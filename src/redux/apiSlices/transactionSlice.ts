import { api } from "../api/baseApi";

const transactionsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        menuTransactionUpdate: builder.mutation({
            query: ({id, status}) => {
                return{
                    method: "PATCH",
                    url: `/order/status-update/${id}`,
                    body: {status: status},
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
        menuTransaction: builder.query({
            query: ({page, search}) => {
                const params = new URLSearchParams();
                if(page) params.append("page", page);
                if(search) params.append("search", search);
                return{
                    method: "GET",
                    url: `/order?${params.toString()}`,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
        mealTransactionUpdate: builder.mutation({
            query: ({id, status}) => {
                return{
                    method: "PATCH",
                    url: `/meal-plan-order/status-update/${id}`,
                    body: {status: status},
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
        mealTransaction: builder.query({
            query: (page) => {
                const params = new URLSearchParams();
                if(page) params.append("page", page);
                return{
                    method: "GET",
                    url: `/meal-plan-order?${params.toString()}`,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
    })
});

export const { useMealTransactionQuery, useMenuTransactionQuery, useMealTransactionUpdateMutation, useMenuTransactionUpdateMutation } = transactionsSlice;