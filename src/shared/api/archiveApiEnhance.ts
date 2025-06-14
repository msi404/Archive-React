import { archiveApi as generatedApi } from '@/shared/api/archiveApi'

const extendedApi = generatedApi.enhanceEndpoints({
  addTagTypes: ['Documents', 'CartImages', 'Dashboard', 'Destination', 'Users'],
  endpoints: {
    getApiUser: {
      providesTags: [ 'Users' ],
    },
    getApiDashboard: {
      providesTags: [ 'Dashboard' ],
    },
    getApiDocument: {
      providesTags: [ 'Documents' ],
    },
    getApiDestination: {
      providesTags: [ 'Destination' ],
    },
    getApiDocumentImageCart: {
      providesTags: [ 'CartImages' ]
    },
    deleteApiDestinationById: {
      invalidatesTags: [ 'Destination' ],
    },
    postApiDestination: {
      invalidatesTags: [ 'Destination' ],
    },
    deleteApiDocumentById: {
      invalidatesTags: [ 'Documents' ],
    },
    putApiDocumentById: {
      invalidatesTags: [ 'Documents' ],
    },
    deleteApiDocumentImageCartById: {
      invalidatesTags: [ { type: 'CartImages' } ]
    },
    getApiTitle: {
      providesTags: [ 'Dashboard' ],
    },
    postApiUploadFile: {
      invalidatesTags: [ { type: 'CartImages' } ]
    },
    deleteApiTitleById: {
      invalidatesTags: [ 'Dashboard' ],
    },
    postApiTitle: {
      invalidatesTags: [ 'Dashboard' ],
    },
    postApiShareDocument: {
      invalidatesTags: [ 'Documents' ],
    },
    deleteApiDocumentByDocumentIdRemoveAll: {
      invalidatesTags: [ 'Documents' ],
    },
    deleteApiDocumentByDocumentIdRemove: {
      invalidatesTags: [ 'Documents' ],
    },
    deleteApiUserById: {
      invalidatesTags: [ 'Users' ],
    },
    putApiUserById: {
      invalidatesTags: [ 'Users' ],
    },
    putApiUserPasswordById: {
      invalidatesTags: [ 'Users' ],
    },
    postApiUser: {
      invalidatesTags: [ 'Users' ],
    },
    putApiUserActiveById: {
      invalidatesTags: [ 'Users' ],
    },
  }
})

export const {
  useGetApiDocumentQuery,
  useDeleteApiDocumentByIdMutation,
  usePutApiDocumentByIdMutation,
  useGetApiDocumentImageCartQuery,
  useDeleteApiDocumentImageCartByIdMutation,
  usePostApiUploadFileFlipMutation,
  usePostApiUploadFileMutation,
  useGetApiDashboardQuery,
  useDeleteApiTitleByIdMutation,
  usePostApiTitleMutation,
  useGetApiTitleQuery,
  useGetApiDestinationQuery,
  useDeleteApiDestinationByIdMutation,
  usePostApiDestinationMutation,
  usePostApiShareDocumentMutation,
  useDeleteApiDocumentByDocumentIdRemoveAllMutation,
  useDeleteApiDocumentByDocumentIdRemoveMutation,
  useGetApiUserQuery,
  useDeleteApiUserByIdMutation,
  usePutApiUserByIdMutation,
  usePutApiUserPasswordByIdMutation,
  usePutApiUserActiveByIdMutation,
  usePostApiUserMutation,
} = extendedApi
