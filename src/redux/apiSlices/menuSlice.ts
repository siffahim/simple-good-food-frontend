import { api } from "../api/baseApi";

const menuSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        createMenu: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/products/create-product",
                    body: data,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
        menu: builder.query({
            query: ({page, tab, meal, searchTerm}) => {
                const params = new URLSearchParams();
                if(page) params.append("page", page);
                if(tab) params.append("menu", tab);
                if(meal) params.append("mealPlan", meal);
                if(searchTerm) params.append("searchTerm", searchTerm);
                return{
                    method: "GET",
                    url: `/products?${params.toString()}`
                }
            }
        }),
        menuDetails: builder.query({
            query: (id) => {
                return{
                    method: "GET",
                    url: `/products/${id}`
                }
            },
            transformResponse: (response:any)=>{
                return response?.data;
            }
        }),
        relatedMenu: builder.query({
            query: (id:string) => {
                return{
                    method: "GET",
                    url: `/products/related/${id}`
                }
            },
            transformResponse: (response:any)=>{
                return response?.data;
            }
        }),
        deleteMenu: builder.mutation({
            query: (id) => {
                return{
                    method: "DELETE",
                    url: `/products/${id}`,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
                    }
                }
            }
        }),
        updateMenu: builder.mutation({
            query: ({id, data}) => {
                return{
                    method: "PATCH",
                    url: `/user/profile/${id}`,
                    body: data
                }
            }
        }),
    })
});

export const {
    useCreateMenuMutation, 
    useMenuQuery,
    useMenuDetailsQuery,
    useDeleteMenuMutation,
    useUpdateMenuMutation,
    useRelatedMenuQuery
} = menuSlice;