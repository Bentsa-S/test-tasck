import { createApi } from '@reduxjs/toolkit/query/react';
import { request, gql } from 'graphql-request';
import type { Form, Response, CreateFormInput, SubmitResponseInput } from '../types';

const graphqlBaseQuery = ({ baseUrl }: { baseUrl: string }) => 
  async ({ document, variables }: { document: string; variables?: Record<string, unknown> }) => {
    try {
      const result = await request(baseUrl, document, variables);
      return { data: result };
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response: { status?: number; errors?: unknown }; message?: string };
        return {
          error: {
            status: err.response.status || 500,
            data: err.response.errors || err.message,
          },
        };
      }
      return {
        error: {
          status: 500,
          data: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }
  };

export const api = createApi({
  reducerPath: 'api',
  baseQuery: graphqlBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/graphql' 
  }),
  tagTypes: ['Form', 'Response'],
  endpoints: (builder) => ({
    getForms: builder.query<{ forms: Form[] }, void>({
      query: () => ({
        document: gql`
          query GetForms {
            forms {
              id
              title
              description
            }
          }
        `,
      }),
      providesTags: ['Form'],
    }),
    getForm: builder.query<{ form: Form }, string>({
      query: (id) => ({
        document: gql`
          query GetForm($id: ID!) {
            form(id: $id) {
              id
              title
              description
              questions {
                id
                title
                type
                required
                options
              }
            }
          }
        `,
        variables: { id },
      }),
      providesTags: (_result, _error, id) => [{ type: 'Form', id }],
    }),
    getResponses: builder.query<{ responses: Response[] }, string>({
      query: (formId) => ({
        document: gql`
          query GetResponses($formId: ID!) {
            responses(formId: $formId) {
              id
              formId
              submittedAt
              answers {
                questionId
                value
              }
            }
          }
        `,
        variables: { formId },
      }),
      providesTags: (_result, _error, formId) => [{ type: 'Response', id: formId }],
    }),
    createForm: builder.mutation<{ createForm: Form }, CreateFormInput>({
      query: (input) => ({
        document: gql`
          mutation CreateForm($input: CreateFormInput!) {
            createForm(input: $input) {
              id
              title
            }
          }
        `,
        variables: { input },
      }),
      invalidatesTags: ['Form'],
    }),
    submitResponse: builder.mutation<{ submitResponse: Response }, SubmitResponseInput>({
      query: (input) => ({
        document: gql`
          mutation SubmitResponse($input: SubmitResponseInput!) {
            submitResponse(input: $input) {
              id
            }
          }
        `,
        variables: { input },
      }),
      invalidatesTags: (_result, _error, { formId }) => [{ type: 'Response', id: formId }],
    }),
    deleteForm: builder.mutation<{ deleteForm: boolean }, string>({
      query: (id) => ({
        document: gql`
          mutation DeleteForm($id: ID!) {
            deleteForm(id: $id)
          }
        `,
        variables: { id },
      }),
      invalidatesTags: ['Form', 'Response'],
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormQuery,
  useGetResponsesQuery,
  useCreateFormMutation,
  useSubmitResponseMutation,
  useDeleteFormMutation,
} = api;
