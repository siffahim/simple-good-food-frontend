import { api } from "../api/baseApi";

const PaymentSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        makePayment: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/order/create-payment-intent",
                    body: data,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
        couponVerified: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/order/apply-promo-code",
                    body: data,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
    })
});

export const {
   useMakePaymentMutation,
   useCouponVerifiedMutation
} = PaymentSlice;