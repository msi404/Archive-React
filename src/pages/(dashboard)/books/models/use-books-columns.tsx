import { useMemo } from 'react'
import type { ReturnDocument } from '@/shared/api/archiveApi';
import { Input } from '@/shared/components/ui/input';
import type { ColumnDef } from '@tanstack/react-table'
// import { TableColumnHeader } from '@/shared/components/column-header'

export const useBooksColumns = () =>
{
	
const booksColumns: ColumnDef<ReturnDocument>[] = useMemo<ColumnDef<ReturnDocument>[]>(() => [
	{
		accessorKey: 'titleName',
		header: ({ column }) => (
			<div className="flex flex-col gap-1">
			  <span>الموضوع</span>
			  <Input
				 placeholder="ابحث..."
				 className="h-8"
				 value={(column.getFilterValue() ?? '') as string}
				 onChange={(e) => column.setFilterValue(e.target.value)}
			  />
			</div>
		 )
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
		header: ({ column }) => (
			<div className="flex flex-col gap-1">
			  <span>الشخص المعني</span>
			  <Input
				 placeholder="ابحث..."
				 className="h-8"
				 value={(column.getFilterValue() ?? '') as string}
				 onChange={(e) => column.setFilterValue(e.target.value)}
			  />
			</div>
		 )
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
], [])
	
	return {
		booksColumns
	}

}