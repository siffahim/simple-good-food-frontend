import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.sgf-sa.com/api/v1"
    }),
    endpoints: () => ({})
});

export const imageUrl = "https://api.sgf-sa.com";
// export const imageUrl = "http://192.168.10.185:5000";