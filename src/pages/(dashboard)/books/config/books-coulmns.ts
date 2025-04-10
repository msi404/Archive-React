import type { ColumnDef } from '@tanstack/react-table';

export type BookType = {
	id: string
	actionType: number
	bookKind: string
	comments: string
	concernedPerson: string
	created: Date
	date: Date
	destination: string
	destinationId: string
	destinationName: string
	//review
	documentAttachments: string[]
	documentAttachmentsCount: number
	footNote: string
	fromUser: string
	image: string
	internalIncoming: string
	//review
	internalIncomingDate: string
	isFinished: boolean
	number: number
	point: string
	referencePerson: string
	//review
	shareDocuments: string[]
	//review
	status: string
	title: {
		created: Date
		id: string
		name: string
	}
	titleId: string
	titleName: string
	toUserName: string
	//review
	trackings: string[]
	//review
	type: number
	user: {
		email: string
		id: string
		isActive: boolean
		name: string
		phoneNumber: number
		role: string
	}
	userId: string
}

export const booksColumns: ColumnDef<BookType>[] = [
	{
		accessorKey: 'bookKind',
		header: 'تصنيف الكتاب'
	}
]