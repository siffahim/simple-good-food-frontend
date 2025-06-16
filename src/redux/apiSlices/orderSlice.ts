import { api } from "../api/baseApi";

const orderSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        mealOrder: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/meal-plan-order",
                    body: data,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
        menuOrder: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/order",
                    body: data,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
        getOrderList: builder.query({
            query: ({page, search}) => {
                const params = new URLSearchParams();
                if(page) params.append("page", page);
                if(search) params.append("search", search);
                return{
                    method: "GET",
                    url: `/user/profile?${params.toString()}`,
                }
            }
        }),

        getOrder: builder.query({
            query: () => {
                return{
                    method: "GET",
                    url: `/user/profile`,
                }
            }
        }),

        makeComplete: builder.mutation({
            query: (id) => {
                return{
                    method: "PATCH",
                    url: `/user/profile/${id}`,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        })
    })
});

export const { useGetOrderListQuery, useMenuOrderMutation, useGetOrderQuery, useMealOrderMutation, useMakeCompleteMutation } = orderSlice;