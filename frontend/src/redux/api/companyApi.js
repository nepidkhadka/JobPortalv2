import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASEURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";

export const companyApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    credentials: "include",
    mode: "cors",
  }),
  reducerPath: "companyApi",
  tagTypes: ["Company"],
  endpoints: (builder) => ({
    registerCompany: builder.mutation({
      query: (data) => ({
        url: "/company/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),
    updateCompany: builder.mutation({
      query: ({ id, data }) => ({
        url: `/company/update/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/company/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),
    getCompanyById: builder.query({
      query: (id) => `/company/get/${id}`,
      providesTags: ["Company"],
      transformResponse: (response) => response.company,
    }),
    getAllCompanies: builder.query({
      query: (id) => ({
        url: "/company/get",
        method: "GET",
      }),
      providesTags: ["Company"],
    }),
  }),
});

export const {
  useRegisterCompanyMutation,
  useUpdateCompanyMutation,
  useGetCompanyByIdQuery,
  useGetAllCompaniesQuery,
  useDeleteCompanyMutation,
} = companyApi;
