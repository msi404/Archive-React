import type { ReturnDocument } from '@/shared/api/archiveApi'
import type { ColumnDef } from '@tanstack/react-table'
// import { TableColumnHeader } from '@/shared/components/column-header'

export const useBooksColumns = () =>
{
	
const booksColumns: ColumnDef<ReturnDocument>[] = [
	{
		accessorKey: 'titleName',
		header: 'الموضوع'
	},
	{
		accessorKey: 'bookKind',
		header: 'تصنيف الكتاب'
	},
	{
		accessorKey: 'type',
		header: 'نوع الكتاب'
	},
	{
		accessorKey: 'destinationName',
		header: 'من / الى'
	},
	{
		accessorKey: 'concernedPerson',
		header: 'الشخص المعني'
	},
	{
		accessorKey: 'referencePerson',
		header: 'المعرف'
	},
	{
		accessorKey: 'point',
		header: 'الجهة'
	},
	{
		accessorKey: 'documentAttachmentsCount',
		header: 'المرفقات'
	},
	{
		accessorKey: 'internalIncoming',
		header: 'رقم الوارد الداخلي'
	},
	{
		accessorKey: 'internalIncomingDate',
		header: 'تاريخ الوارد الداخلي'
	},
	{
		accessorKey: 'number',
		header: 'العدد'
	},
	{
		accessorKey: 'date',
		header: 'تاريخ الكتاب'
	},
	{
		accessorKey: 'created',
		header: 'تاريخ الانشاء'
	},
	{
		accessorKey: 'point',
		header: 'اضيف بواسطة'
	}
]
	
	return {
		booksColumns
	}

}