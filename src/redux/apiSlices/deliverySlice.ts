import { api } from "../api/baseApi";

const DeliverySlice = api.injectEndpoints({
    endpoints: (builder) => ({
        updateCharge: builder.mutation({
            query: ({id, updatedData}) => {
                return{
                    method: "PATCH",
                    url: `/delivery-charge/${id}`,
                    body: {...updatedData},
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
        charge: builder.query({
            query: () => {
                return{
                    method: "GET",
                    url: "/delivery-charge",
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
    })
});

export const {
   useChargeQuery,
   useUpdateChargeMutation
} = DeliverySlice;