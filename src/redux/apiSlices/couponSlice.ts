import { api } from "../api/baseApi";

const couponSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        createCoupon: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/coupon/create-coupon",
                    body: data,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
        coupon: builder.query({
            query: () => {
                return{
                    method: "GET",
                    url: `/coupon`,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
        deleteCoupon: builder.mutation({
            query: (id) => {
                return{
                    method: "DELETE",
                    url: `/coupon/${id}`,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
    })
});

export const {
   useCouponQuery,
   useCreateCouponMutation,
   useDeleteCouponMutation
} = couponSlice;