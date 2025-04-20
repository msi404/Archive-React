import { archiveApi as generatedApi } from '@/shared/api/archiveApi'

const extendedApi = generatedApi.enhanceEndpoints({
  addTagTypes: ['Documents'],
  endpoints: {
    getApiDocument: {
      providesTags: ['Documents'],
    },
    deleteApiDocumentById: {
      invalidatesTags: ['Documents'],
    },
    putApiDocumentById: {
      invalidatesTags: ['Documents'],
    }
  },
})

export const {
  useGetApiDocumentQuery,
  useDeleteApiDocumentByIdMutation,
  usePutApiDocumentByIdMutation
} = extendedApi
