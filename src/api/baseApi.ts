import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { StateResponseSchema } from './schemas/state.schema'
import { UpdateTopicRequestSchema } from './schemas/topic.schema'
import { ProjectSubmissionSchema } from './schemas/project.schema'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const rawBaseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1' })
    const result = await rawBaseQuery(args, api, extraOptions)

    if (result.error) {
      // global error logging
      console.error('[RTK QUERY ERROR]', result.error)
    }

    return result
  },
  tagTypes: ['State', 'Module', 'Project'],
  endpoints: (builder) => ({
    getState: builder.query<
      ReturnType<typeof StateResponseSchema.parse>,
      void
    >({
      query: () => '/state',
      transformResponse: (response: unknown) => {
        const parsed = StateResponseSchema.parse(response)
        return parsed
      },
      providesTags: ['State'],
    }),
    updateTopic: builder.mutation<
      { success: boolean },
      { moduleSlug: string; topicId: string; completed: boolean }
    >({
      query: ({ moduleSlug, ...body }) => {
        // Validate request body
        const validatedBody = UpdateTopicRequestSchema.parse(body)
        return {
          url: `/modules/${moduleSlug}/topics`,
          method: 'PATCH',
          body: validatedBody,
        }
      },
      invalidatesTags: ['State'],
    }),
    submitProject: builder.mutation<
      { success: boolean },
      { moduleSlug: string; projectSlug: string; githubUrl: string; liveUrl: string }
    >({
      query: ({ moduleSlug, projectSlug, ...body }) => {
        const validatedBody = ProjectSubmissionSchema.parse(body)
        return {
          url: `/projects/${moduleSlug}/${projectSlug}/submission`,
          method: 'PUT',
          body: validatedBody,
        }
      },
      invalidatesTags: ['Project'],
    }),
    submitModule: builder.mutation<
      { success: boolean },
      { moduleSlug: string; githubUrl: string; liveUrl: string }
    >({
      query: ({ moduleSlug, ...body }) => {
        const validatedBody = ProjectSubmissionSchema.parse(body)
        return {
          url: `/modules/${moduleSlug}/submission`,
          method: 'PUT',
          body: validatedBody,
        }
      },
      invalidatesTags: ['State', 'Module', 'Project'],
    }),
    deleteModuleSubmission: builder.mutation<
      { success: boolean },
      { moduleSlug: string }
    >({
      query: ({ moduleSlug }) => ({
        url: `/modules/${moduleSlug}/submission`,
        method: 'DELETE',
      }),
      invalidatesTags: ['State', 'Module', 'Project'],
    }),
    touchActivity: builder.mutation<
      { success: boolean },
      void
    >({
      query: () => ({
        url: '/activity/touch',
        method: 'POST',
      }),
      invalidatesTags: ['State'],
    }),
  }),
})

export const {
  useGetStateQuery,
  useUpdateTopicMutation,
  useSubmitProjectMutation,
  useSubmitModuleMutation,
  useDeleteModuleSubmissionMutation,
  useTouchActivityMutation,
} = api
