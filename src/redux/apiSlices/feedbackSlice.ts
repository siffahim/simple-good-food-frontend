import { api } from "../api/baseApi";

const feedbackSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        putFeedback: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/feedback",
                    body: data,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
        getFeedback: builder.query({
            query: (page) => {
                const params = new URLSearchParams();
                if(page) params.append("page", page);
                return{
                    method: "GET",
                    url: `/feedback/publish?${params.toString()}`,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
        feedback: builder.query({
            query: (page) => {
                const params = new URLSearchParams();
                if(page) params.append("page", page);
                return{
                    method: "GET",
                    url: `/feedback?${params.toString()}`,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
        publishFeedback: builder.mutation({
            query: (id) => {
                return{
                    method: "PATCH",
                    url: `/feedback/status/${id}`,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
    })
});

export const {
   useGetFeedbackQuery,
   useFeedbackQuery,
   usePutFeedbackMutation,
   usePublishFeedbackMutation
} = feedbackSlice;