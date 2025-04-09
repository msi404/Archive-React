/* eslint-disable @typescript-eslint/no-explicit-any */
import { tatweerApi as api } from '../lib/features/apiSlice'
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		getApiAuth: build.query<GetApiAuthApiResponse, GetApiAuthApiArg>({
			query: () => ({ url: `/api/Auth` })
		}),
		getApiAuthUsersBackup: build.query<
			GetApiAuthUsersBackupApiResponse,
			GetApiAuthUsersBackupApiArg
		>({
			query: () => ({ url: `/api/Auth/users/backup` })
		}),
		getApiAuthUsersAttachRoles: build.query<
			GetApiAuthUsersAttachRolesApiResponse,
			GetApiAuthUsersAttachRolesApiArg
		>({
			query: () => ({ url: `/api/Auth/users/attach/roles` })
		}),
		postApiAuthLogin: build.mutation<
			PostApiAuthLoginApiResponse,
			PostApiAuthLoginApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Auth/login`,
				method: 'POST',
				body: queryArg.loginDto
			})
		}),
		getApiDashboard: build.query<
			GetApiDashboardApiResponse,
			GetApiDashboardApiArg
		>({
			query: () => ({ url: `/api/Dashboard` })
		}),
		getApiDashboardBook: build.query<
			GetApiDashboardBookApiResponse,
			GetApiDashboardBookApiArg
		>({
			query: () => ({ url: `/api/Dashboard/book` })
		}),
		getApiDashboardBookInternalDate: build.query<
			GetApiDashboardBookInternalDateApiResponse,
			GetApiDashboardBookInternalDateApiArg
		>({
			query: () => ({ url: `/api/Dashboard/book/internal/date` })
		}),
		getApiDashboardShare: build.query<
			GetApiDashboardShareApiResponse,
			GetApiDashboardShareApiArg
		>({
			query: () => ({ url: `/api/Dashboard/share` })
		}),
		getApiDashboardDes: build.query<
			GetApiDashboardDesApiResponse,
			GetApiDashboardDesApiArg
		>({
			query: () => ({ url: `/api/Dashboard/des` })
		}),
		getApiDashboardTitle: build.query<
			GetApiDashboardTitleApiResponse,
			GetApiDashboardTitleApiArg
		>({
			query: () => ({ url: `/api/Dashboard/title` })
		}),
		getApiDashboardAttach: build.query<
			GetApiDashboardAttachApiResponse,
			GetApiDashboardAttachApiArg
		>({
			query: () => ({ url: `/api/Dashboard/attach` })
		}),
		postApiDestination: build.mutation<
			PostApiDestinationApiResponse,
			PostApiDestinationApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Destination`,
				method: 'POST',
				body: queryArg.createDestination
			})
		}),
		getApiDestination: build.query<
			GetApiDestinationApiResponse,
			GetApiDestinationApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Destination`,
				params: {
					Name: queryArg.name,
					Id: queryArg.id,
					Sort: queryArg.sort,
					PageIndex: queryArg.pageIndex,
					PageSize: queryArg.pageSize
				}
			})
		}),
		putApiDestinationById: build.mutation<
			PutApiDestinationByIdApiResponse,
			PutApiDestinationByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Destination/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.updateDestination
			})
		}),
		deleteApiDestinationById: build.mutation<
			DeleteApiDestinationByIdApiResponse,
			DeleteApiDestinationByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Destination/${queryArg.id}`,
				method: 'DELETE'
			})
		}),
		postApiDocument: build.mutation<
			PostApiDocumentApiResponse,
			PostApiDocumentApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Document`,
				method: 'POST',
				body: queryArg.createDocument
			})
		}),
		getApiDocument: build.query<
			GetApiDocumentApiResponse,
			GetApiDocumentApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Document`,
				params: {
					Number: queryArg['number'],
					Date: queryArg.date,
					DestinationId: queryArg.destinationId,
					TitleId: queryArg.titleId,
					TitleName: queryArg.titleName,
					Type: queryArg['type'],
					InternalIncoming: queryArg.internalIncoming,
					point: queryArg.point,
					FromAndToName: queryArg.fromAndToName,
					Comments: queryArg.comments,
					FootNote: queryArg.footNote,
					Image: queryArg.image,
					UserId: queryArg.userId,
					ShareToUserId: queryArg.shareToUserId,
					ShareRoleId: queryArg.shareRoleId,
					ShareFromUserId: queryArg.shareFromUserId,
					ConcernedPerson: queryArg.concernedPerson,
					IsFinished: queryArg.isFinished,
					ActionType: queryArg.actionType,
					InternalIncomingDate: queryArg.internalIncomingDate,
					ReferencePerson: queryArg.referencePerson,
					BookKind: queryArg.bookKind,
					ParentId: queryArg.parentId,
					Id: queryArg.id,
					Sort: queryArg.sort,
					PageIndex: queryArg.pageIndex,
					PageSize: queryArg.pageSize
				}
			})
		}),
		postApiDocumentAttachmentById: build.mutation<
			PostApiDocumentAttachmentByIdApiResponse,
			PostApiDocumentAttachmentByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Document/Attachment/${queryArg.id}`,
				method: 'POST',
				body: queryArg.attachDocumentImageCartId
			})
		}),
		putApiDocumentById: build.mutation<
			PutApiDocumentByIdApiResponse,
			PutApiDocumentByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Document/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.updateDocument
			})
		}),
		deleteApiDocumentById: build.mutation<
			DeleteApiDocumentByIdApiResponse,
			DeleteApiDocumentByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Document/${queryArg.id}`,
				method: 'DELETE'
			})
		}),
		putApiDocumentChangeStatusById: build.mutation<
			PutApiDocumentChangeStatusByIdApiResponse,
			PutApiDocumentChangeStatusByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Document/ChangeStatus/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.changeStatus
			})
		}),
		deleteApiDocumentByDocumentIdRemove: build.mutation<
			DeleteApiDocumentByDocumentIdRemoveApiResponse,
			DeleteApiDocumentByDocumentIdRemoveApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Document/${queryArg.documentId}/Remove`,
				method: 'DELETE'
			})
		}),
		deleteApiDocumentByDocumentIdRemoveAndUserId: build.mutation<
			DeleteApiDocumentByDocumentIdRemoveAndUserIdApiResponse,
			DeleteApiDocumentByDocumentIdRemoveAndUserIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Document/${queryArg.documentId}/Remove/${queryArg.userId}`,
				method: 'DELETE'
			})
		}),
		deleteApiDocumentByDocumentIdRemoveAll: build.mutation<
			DeleteApiDocumentByDocumentIdRemoveAllApiResponse,
			DeleteApiDocumentByDocumentIdRemoveAllApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Document/${queryArg.documentId}/RemoveAll`,
				method: 'DELETE'
			})
		}),
		postApiDocumentAttachment: build.mutation<
			PostApiDocumentAttachmentApiResponse,
			PostApiDocumentAttachmentApiArg
		>({
			query: (queryArg) => ({
				url: `/api/DocumentAttachment`,
				method: 'POST',
				body: queryArg.createDocumentAttachment
			})
		}),
		getApiDocumentAttachment: build.query<
			GetApiDocumentAttachmentApiResponse,
			GetApiDocumentAttachmentApiArg
		>({
			query: (queryArg) => ({
				url: `/api/DocumentAttachment`,
				params: {
					Name: queryArg.name,
					DocumentId: queryArg.documentId,
					Id: queryArg.id,
					Sort: queryArg.sort,
					PageIndex: queryArg.pageIndex,
					PageSize: queryArg.pageSize
				}
			})
		}),
		putApiDocumentAttachmentById: build.mutation<
			PutApiDocumentAttachmentByIdApiResponse,
			PutApiDocumentAttachmentByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/DocumentAttachment/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.updateDocumentAttachment
			})
		}),
		deleteApiDocumentAttachmentById: build.mutation<
			DeleteApiDocumentAttachmentByIdApiResponse,
			DeleteApiDocumentAttachmentByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/DocumentAttachment/${queryArg.id}`,
				method: 'DELETE'
			})
		}),
		postApiDocumentImageCart: build.mutation<
			PostApiDocumentImageCartApiResponse,
			PostApiDocumentImageCartApiArg
		>({
			query: (queryArg) => ({
				url: `/api/DocumentImageCart`,
				method: 'POST',
				body: queryArg.createDocumentImageCart
			})
		}),
		getApiDocumentImageCart: build.query<
			GetApiDocumentImageCartApiResponse,
			GetApiDocumentImageCartApiArg
		>({
			query: (queryArg) => ({
				url: `/api/DocumentImageCart`,
				params: {
					Date: queryArg.date,
					UserId: queryArg.userId,
					Id: queryArg.id,
					Sort: queryArg.sort,
					PageIndex: queryArg.pageIndex,
					PageSize: queryArg.pageSize
				}
			})
		}),
		putApiDocumentImageCartById: build.mutation<
			PutApiDocumentImageCartByIdApiResponse,
			PutApiDocumentImageCartByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/DocumentImageCart/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.updateDocumentImageCart
			})
		}),
		deleteApiDocumentImageCartById: build.mutation<
			DeleteApiDocumentImageCartByIdApiResponse,
			DeleteApiDocumentImageCartByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/DocumentImageCart/${queryArg.id}`,
				method: 'DELETE'
			})
		}),
		getApiGlobalEnums: build.query<
			GetApiGlobalEnumsApiResponse,
			GetApiGlobalEnumsApiArg
		>({
			query: () => ({ url: `/api/Global/Enums` })
		}),
		postApiGroup: build.mutation<PostApiGroupApiResponse, PostApiGroupApiArg>({
			query: (queryArg) => ({
				url: `/api/Group`,
				method: 'POST',
				body: queryArg.createGroup
			})
		}),
		getApiGroup: build.query<GetApiGroupApiResponse, GetApiGroupApiArg>({
			query: (queryArg) => ({
				url: `/api/Group`,
				params: {
					Name: queryArg.name,
					Id: queryArg.id,
					Sort: queryArg.sort,
					PageIndex: queryArg.pageIndex,
					PageSize: queryArg.pageSize
				}
			})
		}),
		putApiGroupById: build.mutation<
			PutApiGroupByIdApiResponse,
			PutApiGroupByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Group/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.updateGroup
			})
		}),
		deleteApiGroupById: build.mutation<
			DeleteApiGroupByIdApiResponse,
			DeleteApiGroupByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Group/${queryArg.id}`,
				method: 'DELETE'
			})
		}),
		postApiMapGroupUser: build.mutation<
			PostApiMapGroupUserApiResponse,
			PostApiMapGroupUserApiArg
		>({
			query: (queryArg) => ({
				url: `/api/MapGroupUser`,
				method: 'POST',
				body: queryArg.createMapGroupUser
			})
		}),
		getApiMapGroupUser: build.query<
			GetApiMapGroupUserApiResponse,
			GetApiMapGroupUserApiArg
		>({
			query: (queryArg) => ({
				url: `/api/MapGroupUser`,
				params: {
					GroupUserId: queryArg.groupUserId,
					UserId: queryArg.userId,
					Id: queryArg.id,
					Sort: queryArg.sort,
					PageIndex: queryArg.pageIndex,
					PageSize: queryArg.pageSize
				}
			})
		}),
		postApiShare: build.mutation<PostApiShareApiResponse, PostApiShareApiArg>({
			query: (queryArg) => ({
				url: `/api/Share`,
				method: 'POST',
				body: queryArg.createShare
			})
		}),
		getApiShare: build.query<GetApiShareApiResponse, GetApiShareApiArg>({
			query: (queryArg) => ({
				url: `/api/Share`,
				params: {
					Name: queryArg.name,
					Id: queryArg.id,
					Sort: queryArg.sort,
					PageIndex: queryArg.pageIndex,
					PageSize: queryArg.pageSize
				}
			})
		}),
		putApiShareById: build.mutation<
			PutApiShareByIdApiResponse,
			PutApiShareByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Share/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.updateShare
			})
		}),
		deleteApiShareById: build.mutation<
			DeleteApiShareByIdApiResponse,
			DeleteApiShareByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Share/${queryArg.id}`,
				method: 'DELETE'
			})
		}),
		postApiShareDocument: build.mutation<
			PostApiShareDocumentApiResponse,
			PostApiShareDocumentApiArg
		>({
			query: (queryArg) => ({
				url: `/api/ShareDocument`,
				method: 'POST',
				body: queryArg.createShareDocument
			})
		}),
		getApiShareDocument: build.query<
			GetApiShareDocumentApiResponse,
			GetApiShareDocumentApiArg
		>({
			query: (queryArg) => ({
				url: `/api/ShareDocument`,
				params: {
					ShareId: queryArg.shareId,
					DocumentId: queryArg.documentId,
					Id: queryArg.id,
					Sort: queryArg.sort,
					PageIndex: queryArg.pageIndex,
					PageSize: queryArg.pageSize
				}
			})
		}),
		postApiShareDocumentShareToAdmin: build.mutation<
			PostApiShareDocumentShareToAdminApiResponse,
			PostApiShareDocumentShareToAdminApiArg
		>({
			query: (queryArg) => ({
				url: `/api/ShareDocument/ShareToAdmin`,
				method: 'POST',
				body: queryArg.createShareDocumentToAdmin
			})
		}),
		putApiShareDocumentById: build.mutation<
			PutApiShareDocumentByIdApiResponse,
			PutApiShareDocumentByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/ShareDocument/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.updateShareDocument
			})
		}),
		deleteApiShareDocumentById: build.mutation<
			DeleteApiShareDocumentByIdApiResponse,
			DeleteApiShareDocumentByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/ShareDocument/${queryArg.id}`,
				method: 'DELETE'
			})
		}),
		postApiTitle: build.mutation<PostApiTitleApiResponse, PostApiTitleApiArg>({
			query: (queryArg) => ({
				url: `/api/Title`,
				method: 'POST',
				body: queryArg.createTitle
			})
		}),
		getApiTitle: build.query<GetApiTitleApiResponse, GetApiTitleApiArg>({
			query: (queryArg) => ({
				url: `/api/Title`,
				params: {
					Name: queryArg.name,
					Id: queryArg.id,
					Sort: queryArg.sort,
					PageIndex: queryArg.pageIndex,
					PageSize: queryArg.pageSize
				}
			})
		}),
		putApiTitleById: build.mutation<
			PutApiTitleByIdApiResponse,
			PutApiTitleByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Title/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.updateTitle
			})
		}),
		deleteApiTitleById: build.mutation<
			DeleteApiTitleByIdApiResponse,
			DeleteApiTitleByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Title/${queryArg.id}`,
				method: 'DELETE'
			})
		}),
		postApiTracking: build.mutation<
			PostApiTrackingApiResponse,
			PostApiTrackingApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Tracking`,
				method: 'POST',
				body: queryArg.createTracking
			})
		}),
		getApiTracking: build.query<
			GetApiTrackingApiResponse,
			GetApiTrackingApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Tracking`,
				params: {
					DocumentId: queryArg.documentId,
					Id: queryArg.id,
					Sort: queryArg.sort,
					PageIndex: queryArg.pageIndex,
					PageSize: queryArg.pageSize
				}
			})
		}),
		putApiTrackingById: build.mutation<
			PutApiTrackingByIdApiResponse,
			PutApiTrackingByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Tracking/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.updateTracking
			})
		}),
		deleteApiTrackingById: build.mutation<
			DeleteApiTrackingByIdApiResponse,
			DeleteApiTrackingByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/Tracking/${queryArg.id}`,
				method: 'DELETE'
			})
		}),
		postApiUploadFile: build.mutation<
			PostApiUploadFileApiResponse,
			PostApiUploadFileApiArg
		>({
			query: (queryArg) => ({
				url: `/api/UploadFile`,
				method: 'POST',
				body: queryArg.body
			})
		}),
		postApiUploadFileFlip: build.mutation<
			PostApiUploadFileFlipApiResponse,
			PostApiUploadFileFlipApiArg
		>({
			query: (queryArg) => ({
				url: `/api/UploadFile/Flip`,
				method: 'POST',
				body: queryArg.flipImage
			})
		}),
		postApiUploadFileBase64: build.mutation<
			PostApiUploadFileBase64ApiResponse,
			PostApiUploadFileBase64ApiArg
		>({
			query: (queryArg) => ({
				url: `/api/UploadFile/Base64`,
				method: 'POST',
				body: queryArg.body
			})
		}),
		getApiUploadFileByFileName: build.query<
			GetApiUploadFileByFileNameApiResponse,
			GetApiUploadFileByFileNameApiArg
		>({
			query: (queryArg) => ({ url: `/api/UploadFile/${queryArg.fileName}` })
		}),
		postApiUser: build.mutation<PostApiUserApiResponse, PostApiUserApiArg>({
			query: (queryArg) => ({
				url: `/api/User`,
				method: 'POST',
				body: queryArg.createUser
			})
		}),
		getApiUser: build.query<GetApiUserApiResponse, GetApiUserApiArg>({
			query: (queryArg) => ({
				url: `/api/User`,
				params: {
					FullName: queryArg.fullName,
					UserName: queryArg.userName,
					Email: queryArg.email,
					Created: queryArg.created,
					IsActive: queryArg.isActive,
					RoleId: queryArg.roleId,
					RoleName: queryArg.roleName,
					Id: queryArg.id,
					Sort: queryArg.sort,
					PageIndex: queryArg.pageIndex,
					PageSize: queryArg.pageSize
				}
			})
		}),
		putApiUserRoleById: build.mutation<
			PutApiUserRoleByIdApiResponse,
			PutApiUserRoleByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/User/role/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.updateRole
			})
		}),
		getApiUserRoleSetAll: build.query<
			GetApiUserRoleSetAllApiResponse,
			GetApiUserRoleSetAllApiArg
		>({
			query: () => ({ url: `/api/User/role/set/all` })
		}),
		deleteApiUserById: build.mutation<
			DeleteApiUserByIdApiResponse,
			DeleteApiUserByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/User/${queryArg.id}`,
				method: 'DELETE'
			})
		}),
		putApiUserById: build.mutation<
			PutApiUserByIdApiResponse,
			PutApiUserByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/User/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.updateUser
			})
		}),
		getApiUserById: build.query<
			GetApiUserByIdApiResponse,
			GetApiUserByIdApiArg
		>({
			query: (queryArg) => ({ url: `/api/User/${queryArg.id}` })
		}),
		putApiUserActiveById: build.mutation<
			PutApiUserActiveByIdApiResponse,
			PutApiUserActiveByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/User/Active/${queryArg.id}`,
				method: 'PUT'
			})
		}),
		putApiUserPasswordById: build.mutation<
			PutApiUserPasswordByIdApiResponse,
			PutApiUserPasswordByIdApiArg
		>({
			query: (queryArg) => ({
				url: `/api/User/password/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.updatePasswordUser
			})
		}),
		getApiUserRoles: build.query<
			GetApiUserRolesApiResponse,
			GetApiUserRolesApiArg
		>({
			query: () => ({ url: `/api/User/roles` })
		})
	}),
	overrideExisting: false
})
export { injectedRtkApi as archiveApi }
export type GetApiAuthApiResponse = /** status 200 Success */ UserDto
export type GetApiAuthApiArg = void
export type GetApiAuthUsersBackupApiResponse = /** status 200 Success */ UserDto
export type GetApiAuthUsersBackupApiArg = void
export type GetApiAuthUsersAttachRolesApiResponse =
	/** status 200 Success */ UserDto
export type GetApiAuthUsersAttachRolesApiArg = void
export type PostApiAuthLoginApiResponse = /** status 200 Success */ ApiResponse
export type PostApiAuthLoginApiArg = {
	loginDto: LoginDto
}
export type GetApiDashboardApiResponse =
	/** status 200 Success */ ReturnDashboardApiObject
export type GetApiDashboardApiArg = void
export type GetApiDashboardBookApiResponse = /** status 200 Success */ Book[]
export type GetApiDashboardBookApiArg = void
export type GetApiDashboardBookInternalDateApiResponse =
	/** status 200 Success */ Book[]
export type GetApiDashboardBookInternalDateApiArg = void
export type GetApiDashboardShareApiResponse =
	/** status 200 Success */ Sharebb[]
export type GetApiDashboardShareApiArg = void
export type GetApiDashboardDesApiResponse =
	/** status 200 Success */ Fromandto[]
export type GetApiDashboardDesApiArg = void
export type GetApiDashboardTitleApiResponse = /** status 200 Success */ Title[]
export type GetApiDashboardTitleApiArg = void
export type GetApiDashboardAttachApiResponse =
	/** status 200 Success */ Attachment[]
export type GetApiDashboardAttachApiArg = void
export type PostApiDestinationApiResponse =
	/** status 200 Success */ ApiResponse
export type PostApiDestinationApiArg = {
	createDestination: CreateDestination
}
export type GetApiDestinationApiResponse =
	/** status 200 Success */ ReturnDestinationApiBody
export type GetApiDestinationApiArg = {
	name?: string
	id?: string
	sort?: string
	pageIndex?: number
	pageSize?: number
}
export type PutApiDestinationByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type PutApiDestinationByIdApiArg = {
	id: string
	updateDestination: UpdateDestination
}
export type DeleteApiDestinationByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type DeleteApiDestinationByIdApiArg = {
	id: string
}
export type PostApiDocumentApiResponse = /** status 200 Success */ ApiResponse
export type PostApiDocumentApiArg = {
	createDocument: CreateDocument
}
export type GetApiDocumentApiResponse =
	/** status 200 Success */ ReturnDocumentApiBody
export type GetApiDocumentApiArg = {
	number?: string
	date?: string
	destinationId?: string
	titleId?: string
	titleName?: string
	type?: number
	internalIncoming?: string
	point?: string
	fromAndToName?: string
	comments?: string
	footNote?: string
	image?: string
	userId?: string
	shareToUserId?: string
	shareRoleId?: string
	shareFromUserId?: string
	concernedPerson?: string
	isFinished?: boolean
	actionType?: number
	internalIncomingDate?: string
	referencePerson?: string
	bookKind?: string
	parentId?: string
	id?: string
	sort?: string
	pageIndex?: number
	pageSize?: number
}
export type PostApiDocumentAttachmentByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type PostApiDocumentAttachmentByIdApiArg = {
	id: string
	attachDocumentImageCartId: AttachDocumentImageCartId
}
export type PutApiDocumentByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type PutApiDocumentByIdApiArg = {
	id: string
	updateDocument: UpdateDocument
}
export type DeleteApiDocumentByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type DeleteApiDocumentByIdApiArg = {
	id: string
}
export type PutApiDocumentChangeStatusByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type PutApiDocumentChangeStatusByIdApiArg = {
	id: string
	changeStatus: ChangeStatus
}
export type DeleteApiDocumentByDocumentIdRemoveApiResponse =
	/** status 200 Success */ ApiResponse
export type DeleteApiDocumentByDocumentIdRemoveApiArg = {
	documentId: string
}
export type DeleteApiDocumentByDocumentIdRemoveAndUserIdApiResponse =
	/** status 200 Success */ ApiResponse
export type DeleteApiDocumentByDocumentIdRemoveAndUserIdApiArg = {
	documentId: string
	userId: string
}
export type DeleteApiDocumentByDocumentIdRemoveAllApiResponse =
	/** status 200 Success */ ApiResponse
export type DeleteApiDocumentByDocumentIdRemoveAllApiArg = {
	documentId: string
}
export type PostApiDocumentAttachmentApiResponse =
	/** status 200 Success */ ApiResponse
export type PostApiDocumentAttachmentApiArg = {
	createDocumentAttachment: CreateDocumentAttachment
}
export type GetApiDocumentAttachmentApiResponse =
	/** status 200 Success */ ReturnDocumentAttachmentApiBody
export type GetApiDocumentAttachmentApiArg = {
	name?: string
	documentId?: string
	id?: string
	sort?: string
	pageIndex?: number
	pageSize?: number
}
export type PutApiDocumentAttachmentByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type PutApiDocumentAttachmentByIdApiArg = {
	id: string
	updateDocumentAttachment: UpdateDocumentAttachment
}
export type DeleteApiDocumentAttachmentByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type DeleteApiDocumentAttachmentByIdApiArg = {
	id: string
}
export type PostApiDocumentImageCartApiResponse =
	/** status 200 Success */ ApiResponse
export type PostApiDocumentImageCartApiArg = {
	createDocumentImageCart: CreateDocumentImageCart
}
export type GetApiDocumentImageCartApiResponse =
	/** status 200 Success */ ReturnDocumentImageCartApiBody
export type GetApiDocumentImageCartApiArg = {
	date?: string
	userId?: string
	id?: string
	sort?: string
	pageIndex?: number
	pageSize?: number
}
export type PutApiDocumentImageCartByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type PutApiDocumentImageCartByIdApiArg = {
	id: string
	updateDocumentImageCart: UpdateDocumentImageCart
}
export type DeleteApiDocumentImageCartByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type DeleteApiDocumentImageCartByIdApiArg = {
	id: string
}
export type GetApiGlobalEnumsApiResponse = unknown
export type GetApiGlobalEnumsApiArg = void
export type PostApiGroupApiResponse = /** status 200 Success */ ApiResponse
export type PostApiGroupApiArg = {
	createGroup: CreateGroup
}
export type GetApiGroupApiResponse =
	/** status 200 Success */ ReturnGroupApiBody
export type GetApiGroupApiArg = {
	name?: string
	id?: string
	sort?: string
	pageIndex?: number
	pageSize?: number
}
export type PutApiGroupByIdApiResponse = /** status 200 Success */ ApiResponse
export type PutApiGroupByIdApiArg = {
	id: string
	updateGroup: UpdateGroup
}
export type DeleteApiGroupByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type DeleteApiGroupByIdApiArg = {
	id: string
}
export type PostApiMapGroupUserApiResponse =
	/** status 200 Success */ ApiResponse
export type PostApiMapGroupUserApiArg = {
	createMapGroupUser: CreateMapGroupUser
}
export type GetApiMapGroupUserApiResponse =
	/** status 200 Success */ ReturnMapGroupUserApiBody
export type GetApiMapGroupUserApiArg = {
	groupUserId?: string
	userId?: string
	id?: string
	sort?: string
	pageIndex?: number
	pageSize?: number
}
export type PostApiShareApiResponse = /** status 200 Success */ ApiResponse
export type PostApiShareApiArg = {
	createShare: CreateShare
}
export type GetApiShareApiResponse =
	/** status 200 Success */ ReturnShareApiBody
export type GetApiShareApiArg = {
	name?: string
	id?: string
	sort?: string
	pageIndex?: number
	pageSize?: number
}
export type PutApiShareByIdApiResponse = /** status 200 Success */ ApiResponse
export type PutApiShareByIdApiArg = {
	id: string
	updateShare: UpdateShare
}
export type DeleteApiShareByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type DeleteApiShareByIdApiArg = {
	id: string
}
export type PostApiShareDocumentApiResponse =
	/** status 200 Success */ ApiResponse
export type PostApiShareDocumentApiArg = {
	createShareDocument: CreateShareDocument
}
export type GetApiShareDocumentApiResponse =
	/** status 200 Success */ ReturnShareDocumentApiBody
export type GetApiShareDocumentApiArg = {
	shareId?: string
	documentId?: string
	id?: string
	sort?: string
	pageIndex?: number
	pageSize?: number
}
export type PostApiShareDocumentShareToAdminApiResponse =
	/** status 200 Success */ ApiResponse
export type PostApiShareDocumentShareToAdminApiArg = {
	createShareDocumentToAdmin: CreateShareDocumentToAdmin
}
export type PutApiShareDocumentByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type PutApiShareDocumentByIdApiArg = {
	id: string
	updateShareDocument: UpdateShareDocument
}
export type DeleteApiShareDocumentByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type DeleteApiShareDocumentByIdApiArg = {
	id: string
}
export type PostApiTitleApiResponse = /** status 200 Success */ ApiResponse
export type PostApiTitleApiArg = {
	createTitle: CreateTitle
}
export type GetApiTitleApiResponse =
	/** status 200 Success */ ReturnTitleApiBody
export type GetApiTitleApiArg = {
	name?: string
	id?: string
	sort?: string
	pageIndex?: number
	pageSize?: number
}
export type PutApiTitleByIdApiResponse = /** status 200 Success */ ApiResponse
export type PutApiTitleByIdApiArg = {
	id: string
	updateTitle: UpdateTitle
}
export type DeleteApiTitleByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type DeleteApiTitleByIdApiArg = {
	id: string
}
export type PostApiTrackingApiResponse = /** status 200 Success */ ApiResponse
export type PostApiTrackingApiArg = {
	createTracking: CreateTracking
}
export type GetApiTrackingApiResponse =
	/** status 200 Success */ ReturnTrackingApiBody
export type GetApiTrackingApiArg = {
	documentId?: string
	id?: string
	sort?: string
	pageIndex?: number
	pageSize?: number
}
export type PutApiTrackingByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type PutApiTrackingByIdApiArg = {
	id: string
	updateTracking: UpdateTracking
}
export type DeleteApiTrackingByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type DeleteApiTrackingByIdApiArg = {
	id: string
}
export type PostApiUploadFileApiResponse = unknown
export type PostApiUploadFileApiArg = {
	body: {
		files?: Blob[]
	}
}
export type PostApiUploadFileFlipApiResponse =
	/** status 200 Success */ ApiResponse
export type PostApiUploadFileFlipApiArg = {
	flipImage: FlipImage
}
export type PostApiUploadFileBase64ApiResponse = unknown
export type PostApiUploadFileBase64ApiArg = {
	body: UploadBase64[]
}
export type GetApiUploadFileByFileNameApiResponse = unknown
export type GetApiUploadFileByFileNameApiArg = {
	fileName: string
}
export type PostApiUserApiResponse = /** status 200 Success */ ApiResponse
export type PostApiUserApiArg = {
	createUser: CreateUser
}
export type GetApiUserApiResponse = /** status 200 Success */ ReturnUserApiBody
export type GetApiUserApiArg = {
	fullName?: string
	userName?: string
	email?: string
	created?: string
	isActive?: boolean
	roleId?: string
	roleName?: string
	id?: string
	sort?: string
	pageIndex?: number
	pageSize?: number
}
export type PutApiUserRoleByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type PutApiUserRoleByIdApiArg = {
	id: string
	updateRole: UpdateRole
}
export type GetApiUserRoleSetAllApiResponse =
	/** status 200 Success */ ApiResponse
export type GetApiUserRoleSetAllApiArg = void
export type DeleteApiUserByIdApiResponse = /** status 200 Success */ ApiResponse
export type DeleteApiUserByIdApiArg = {
	id: string
}
export type PutApiUserByIdApiResponse = /** status 200 Success */ ApiResponse
export type PutApiUserByIdApiArg = {
	id: string
	updateUser: UpdateUser
}
export type GetApiUserByIdApiResponse =
	/** status 200 Success */ ReturnUserApiObject
export type GetApiUserByIdApiArg = {
	id: string
}
export type PutApiUserActiveByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type PutApiUserActiveByIdApiArg = {
	id: string
}
export type PutApiUserPasswordByIdApiResponse =
	/** status 200 Success */ ApiResponse
export type PutApiUserPasswordByIdApiArg = {
	id: string
	updatePasswordUser: UpdatePasswordUser
}
export type GetApiUserRolesApiResponse =
	/** status 200 Success */ ReturnRoleApiBody
export type GetApiUserRolesApiArg = void
export type ReturnRole = {
	id?: string | null
	name?: string | null
	ar_name?: string | null
}
export type ReturnUser = {
	id?: string
	name?: string | null
	email?: string | null
	phoneNumber?: string | null
	role?: ReturnRole
	isActive?: boolean
}
export type UserDto = {
	id?: string
	name?: string | null
	email?: string | null
	token?: string | null
	role?: string | null
	user?: ReturnUser
}
export type ApiResponse = {
	statusCode?: number
	message?: string | null
	result?: any | null
}
export type LoginDto = {
	email: string
	password: string
}
export type ReturnDashboard = {
	documents?: number
	todayDocuments?: number
	monthDocuments?: number
	yearDocuments?: number
	documentAttachments?: number
	incomingDocuments?: number
	outgoingDocuments?: number
	finishedDouments?: number
}
export type ReturnDashboardApiObject = {
	statusCode?: number
	message?: string | null
	count?: number
	result?: ReturnDashboard
}
export type Book = {
	id?: string | null
	theNumber?: string | null
	date?: string | null
	fromAndToId?: string | null
	referencePerson?: string | null
	bookKind?: string | null
	destination?: string | null
	threadsId?: string | null
	bookType?: string | null
	concernedPerson?: string | null
	internalIncoming?: string | null
	internalIncomingDate?: string | null
	comments?: string | null
	actionType?: string | null
	footNote?: string | null
	isFinished?: string | null
	bookImage?: string | null
	userId?: string | null
	trackingInfoId?: any | null
	createdAt?: string | null
	updatedAt?: string | null
	isDeleted?: string | null
}
export type Sharebb = {
	id?: string | null
	bookId?: string | null
	fromUserId?: string | null
	toUserId?: string | null
	createdAt?: string | null
	updatedAt?: string | null
	isDeleted?: string | null
	booksId?: any | null
}
export type Fromandto = {
	id?: string | null
	name?: string | null
}
export type Title = {
	id?: string | null
	name?: string | null
}
export type Attachment = {
	id?: string | null
	bookId?: string | null
	attachmentImage?: string | null
	userId?: any | null
	createdAt?: string | null
	updatedAt?: string | null
	isDeleted?: string | null
}
export type CreateDestination = {
	name?: string | null
}
export type ReturnDestination = {
	id?: string
	created?: string
	name?: string | null
}
export type ReturnDestinationApiBody = {
	statusCode?: number
	message?: string | null
	count?: number
	result?: ReturnDestination[] | null
}
export type UpdateDestination = {
	name?: string | null
}
export type CreateDocumentAttachment = {
	name?: string | null
}
export type CreateDocument = {
	number?: string | null
	date?: string
	nameDestination?: string | null
	nameTitle?: string | null
	type?: number
	internalIncoming?: string | null
	comments?: string | null
	footNote?: string | null
	image?: string | null
	documentImageId?: string | null
	concernedPerson?: string | null
	isFinished?: boolean
	point?: string | null
	copyesTo?: string[] | null
	actionType?: number
	internalIncomingDate?: string | null
	referencePerson?: string | null
	bookKind?: string | null
	parentId?: string | null
	documentAttachments?: CreateDocumentAttachment[] | null
}
export type ReturnTitle = {
	id?: string
	created?: string
	name?: string | null
}
export type Status = 0 | 1 | 2
export type ReturnShareDocument = {
	id?: string
	created?: string
	shareId?: string
	documentId?: string
	toUser?: ReturnUser
	fromUser?: ReturnUser
	role?: ReturnRole
}
export type ReturnDocumentAttachment = {
	id?: string
	created?: string
	name?: string | null
	path?: string | null
	documentId?: string
}
export type ReturnTracking = {
	id?: string
	created?: string
	entityName?: string | null
	authorizedName?: string | null
	procedureDate?: string
	documentId?: string
}
export type ReturnDocument = {
	id?: string
	created?: string
	number?: string | null
	date?: string
	destinationId?: string
	titleId?: string
	type?: number
	internalIncoming?: string | null
	comments?: string | null
	footNote?: string | null
	image?: string | null
	userId?: string
	user?: ReturnUser
	concernedPerson?: string | null
	isFinished?: boolean
	actionType?: number
	internalIncomingDate?: string
	referencePerson?: string | null
	bookKind?: string | null
	point?: string | null
	title?: ReturnTitle
	titleName?: string | null
	destination?: ReturnDestination
	destinationName?: string | null
	documentAttachmentsCount?: number
	status?: Status
	shareDocuments?: ReturnShareDocument[] | null
	documentAttachments?: ReturnDocumentAttachment[] | null
	trackings?: ReturnTracking[] | null
	fromUser?: ReturnUser
	children?: ReturnDocument[] | null
	toUserName?: string | null
}
export type ReturnDocumentApiBody = {
	statusCode?: number
	message?: string | null
	count?: number
	result?: ReturnDocument[] | null
}
export type AttachDocumentImageCartId = {
	documentImageCartId?: string
}
export type UpdateDocument = {
	number?: string | null
	date?: string
	nameDestination?: string | null
	nameTitle?: string | null
	point?: string | null
	type?: number
	internalIncoming?: string | null
	comments?: string | null
	footNote?: string | null
	concernedPerson?: string | null
	isFinished?: boolean
	actionType?: number
	internalIncomingDate?: string | null
	referencePerson?: string | null
	bookKind?: string | null
	status?: Status
	parentId?: string | null
}
export type ChangeStatus = {
	status?: Status
}
export type ReturnDocumentAttachmentApiBody = {
	statusCode?: number
	message?: string | null
	count?: number
	result?: ReturnDocumentAttachment[] | null
}
export type UpdateDocumentAttachment = {
	name?: string | null
	path?: string | null
	documentId?: string
}
export type CreateDocumentImageCart = {
	name?: string | null
	path?: string | null
	size?: number
	date?: string
}
export type ReturnDocumentImageCart = {
	id?: string
	created?: string
	name?: string | null
	path?: string | null
	size?: number
	date?: string
}
export type ReturnDocumentImageCartApiBody = {
	statusCode?: number
	message?: string | null
	count?: number
	result?: ReturnDocumentImageCart[] | null
}
export type UpdateDocumentImageCart = {
	name?: string | null
	path?: string | null
	size?: number
	date?: string
}
export type CreateGroup = {
	name?: string | null
}
export type ReturnGroup = {
	id?: string
	created?: string
	name?: string | null
}
export type ReturnGroupApiBody = {
	statusCode?: number
	message?: string | null
	count?: number
	result?: ReturnGroup[] | null
}
export type UpdateGroup = {
	name?: string | null
}
export type CreateMapGroupUser = {
	groupUserId?: string
	userId?: string[] | null
}
export type ReturnMapGroupUser = {
	id?: string
	created?: string
	groupUser?: ReturnGroup
	user?: ReturnUser
}
export type ReturnMapGroupUserApiBody = {
	statusCode?: number
	message?: string | null
	count?: number
	result?: ReturnMapGroupUser[] | null
}
export type CreateShare = {
	name?: string | null
}
export type ReturnShare = {
	id?: string
	created?: string
	name?: string | null
}
export type ReturnShareApiBody = {
	statusCode?: number
	message?: string | null
	count?: number
	result?: ReturnShare[] | null
}
export type UpdateShare = {
	name?: string | null
}
export type CreateShareDocument = {
	documentId?: string
	toUserId?: string | null
	fromUserId?: string | null
	roleId?: string | null
}
export type ReturnShareDocumentApiBody = {
	statusCode?: number
	message?: string | null
	count?: number
	result?: ReturnShareDocument[] | null
}
export type CreateShareDocumentToAdmin = {
	documentId?: string
}
export type UpdateShareDocument = {
	shareId?: string
	documentId?: string
}
export type CreateTitle = {
	name?: string | null
}
export type ReturnTitleApiBody = {
	statusCode?: number
	message?: string | null
	count?: number
	result?: ReturnTitle[] | null
}
export type UpdateTitle = {
	name?: string | null
}
export type CreateTracking = {
	entityName?: string | null
	authorizedName?: string | null
	procedureDate?: string
	documentId?: string
}
export type ReturnTrackingApiBody = {
	statusCode?: number
	message?: string | null
	count?: number
	result?: ReturnTracking[] | null
}
export type UpdateTracking = {
	entityName?: string | null
	authorizedName?: string | null
	procedureDate?: string
	documentId?: string
}
export type FlipImage = {
	name?: string | null
}
export type UploadBase64 = {
	name?: string | null
	base64?: string | null
}
export type CreateUser = {
	name?: string | null
	email?: string | null
	password?: string | null
	phoneNumber?: string | null
	roleName?: string | null
}
export type ReturnUserApiBody = {
	statusCode?: number
	message?: string | null
	count?: number
	result?: ReturnUser[] | null
}
export type UpdateRole = {
	name?: string | null
}
export type UpdateUser = {
	name?: string | null
	email?: string | null
	phoneNumber?: string | null
	roleName?: string | null
}
export type ReturnUserApiObject = {
	statusCode?: number
	message?: string | null
	count?: number
	result?: ReturnUser
}
export type UpdatePasswordUser = {
	newPassword?: string | null
}
export type ReturnRoleApiBody = {
	statusCode?: number
	message?: string | null
	count?: number
	result?: ReturnRole[] | null
}
export const {
	useGetApiAuthQuery,
	useLazyGetApiAuthQuery,
	useGetApiAuthUsersBackupQuery,
	useLazyGetApiAuthUsersBackupQuery,
	useGetApiAuthUsersAttachRolesQuery,
	useLazyGetApiAuthUsersAttachRolesQuery,
	usePostApiAuthLoginMutation,
	useGetApiDashboardQuery,
	useLazyGetApiDashboardQuery,
	useGetApiDashboardBookQuery,
	useLazyGetApiDashboardBookQuery,
	useGetApiDashboardBookInternalDateQuery,
	useLazyGetApiDashboardBookInternalDateQuery,
	useGetApiDashboardShareQuery,
	useLazyGetApiDashboardShareQuery,
	useGetApiDashboardDesQuery,
	useLazyGetApiDashboardDesQuery,
	useGetApiDashboardTitleQuery,
	useLazyGetApiDashboardTitleQuery,
	useGetApiDashboardAttachQuery,
	useLazyGetApiDashboardAttachQuery,
	usePostApiDestinationMutation,
	useGetApiDestinationQuery,
	useLazyGetApiDestinationQuery,
	usePutApiDestinationByIdMutation,
	useDeleteApiDestinationByIdMutation,
	usePostApiDocumentMutation,
	useGetApiDocumentQuery,
	useLazyGetApiDocumentQuery,
	usePostApiDocumentAttachmentByIdMutation,
	usePutApiDocumentByIdMutation,
	useDeleteApiDocumentByIdMutation,
	usePutApiDocumentChangeStatusByIdMutation,
	useDeleteApiDocumentByDocumentIdRemoveMutation,
	useDeleteApiDocumentByDocumentIdRemoveAndUserIdMutation,
	useDeleteApiDocumentByDocumentIdRemoveAllMutation,
	usePostApiDocumentAttachmentMutation,
	useGetApiDocumentAttachmentQuery,
	useLazyGetApiDocumentAttachmentQuery,
	usePutApiDocumentAttachmentByIdMutation,
	useDeleteApiDocumentAttachmentByIdMutation,
	usePostApiDocumentImageCartMutation,
	useGetApiDocumentImageCartQuery,
	useLazyGetApiDocumentImageCartQuery,
	usePutApiDocumentImageCartByIdMutation,
	useDeleteApiDocumentImageCartByIdMutation,
	useGetApiGlobalEnumsQuery,
	useLazyGetApiGlobalEnumsQuery,
	usePostApiGroupMutation,
	useGetApiGroupQuery,
	useLazyGetApiGroupQuery,
	usePutApiGroupByIdMutation,
	useDeleteApiGroupByIdMutation,
	usePostApiMapGroupUserMutation,
	useGetApiMapGroupUserQuery,
	useLazyGetApiMapGroupUserQuery,
	usePostApiShareMutation,
	useGetApiShareQuery,
	useLazyGetApiShareQuery,
	usePutApiShareByIdMutation,
	useDeleteApiShareByIdMutation,
	usePostApiShareDocumentMutation,
	useGetApiShareDocumentQuery,
	useLazyGetApiShareDocumentQuery,
	usePostApiShareDocumentShareToAdminMutation,
	usePutApiShareDocumentByIdMutation,
	useDeleteApiShareDocumentByIdMutation,
	usePostApiTitleMutation,
	useGetApiTitleQuery,
	useLazyGetApiTitleQuery,
	usePutApiTitleByIdMutation,
	useDeleteApiTitleByIdMutation,
	usePostApiTrackingMutation,
	useGetApiTrackingQuery,
	useLazyGetApiTrackingQuery,
	usePutApiTrackingByIdMutation,
	useDeleteApiTrackingByIdMutation,
	usePostApiUploadFileMutation,
	usePostApiUploadFileFlipMutation,
	usePostApiUploadFileBase64Mutation,
	useGetApiUploadFileByFileNameQuery,
	useLazyGetApiUploadFileByFileNameQuery,
	usePostApiUserMutation,
	useGetApiUserQuery,
	useLazyGetApiUserQuery,
	usePutApiUserRoleByIdMutation,
	useGetApiUserRoleSetAllQuery,
	useLazyGetApiUserRoleSetAllQuery,
	useDeleteApiUserByIdMutation,
	usePutApiUserByIdMutation,
	useGetApiUserByIdQuery,
	useLazyGetApiUserByIdQuery,
	usePutApiUserActiveByIdMutation,
	usePutApiUserPasswordByIdMutation,
	useGetApiUserRolesQuery,
	useLazyGetApiUserRolesQuery
} = injectedRtkApi
