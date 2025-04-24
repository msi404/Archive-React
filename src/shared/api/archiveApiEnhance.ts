import { archiveApi as generatedApi } from '@/shared/api/archiveApi'

const extendedApi = generatedApi.enhanceEndpoints({
  addTagTypes: ['Documents', 'CartImages'],
  endpoints: {
    getApiDocument: {
      providesTags: ['Documents'],
    },
    getApiDocumentImageCart: {
      providesTags: ['CartImages']
    },
    deleteApiDocumentById: {
      invalidatesTags: ['Documents'],
    },
    putApiDocumentById: {
      invalidatesTags: ['Documents'],
    },
    deleteApiDocumentImageCartById: {
      invalidatesTags: [{type: 'CartImages'}]
    },
    postApiUploadFile: {
      invalidatesTags: [{type: 'CartImages'}]
    }
  },
})

export const {
  useGetApiDocumentQuery,
  useDeleteApiDocumentByIdMutation,
  usePutApiDocumentByIdMutation,
  useGetApiDocumentImageCartQuery,
  useDeleteApiDocumentImageCartByIdMutation,
  usePostApiUploadFileFlipMutation,
  usePostApiUploadFileMutation
} = extendedApi
