import { useMemo } from 'react'
import type { ReturnDocument } from '@/shared/api/archiveApi';
import type { ColumnDef } from '@tanstack/react-table'
import { TableColumnHeader } from '@/shared/components/column-header'

export const useBooksColumns = () =>
{
	
const booksColumns: ColumnDef<ReturnDocument>[] = useMemo<ColumnDef<ReturnDocument>[]>(() => [
	{
		//review
		accessorKey: 'titleName',
		header: ({ column }) => (
			<TableColumnHeader column={column} title="الموضوع" />
		),
		enableSorting: true,
		meta: {
			label: 'الموضوع'
		 }
	  },
	{
		accessorKey: 'bookKind',
		header: ({ column }) => (
			<TableColumnHeader column={column} title="تصنيف الكتاب" />
		),		meta: {
			label: 'تصنيف الكتاب'
		 }
	},
	{
		accessorKey: 'type',
		header: ({ column }) => (
			<TableColumnHeader column={column} title="نوع الكتاب" />
		),		meta: {
			label: 'نوع الكتاب'
		 }
	},
	{
		accessorKey: 'destinationName',
		header: ({ column }) => (
			<TableColumnHeader column={column} title="من / الى" />
		),		meta: {
			label: 'من / الى'
		 }
	},
	{
		//review
		accessorKey: 'concernedPerson',
		header: ({ column }) => (
			<TableColumnHeader column={column} title="الشخص المعني" />
		),		meta: {
			label: 'الشخص المعني'
		 }
	  },
	{
		accessorKey: 'referencePerson',
		header: ({ column }) => (
			<TableColumnHeader column={column} title="المعرف" />
		),		meta: {
			label: 'المعرف'
		 }
	},
	{
		accessorKey: 'point',
		header: ({ column }) => (
			<TableColumnHeader column={column} title="الجهة" />
		),		meta: {
			label: 'الجهة'
		 }
	},
	{
		accessorKey: 'documentAttachmentsCount',
		header: ({ column }) => (
			<TableColumnHeader column={column} title="المرفقات" />
		),		meta: {
			label: 'المرفقات'
		 }
	},
	{
		accessorKey: 'internalIncoming',
		header: ({ column }) => (
			<TableColumnHeader column={column} title="رقم الوارد الداخلي" />
		),		meta: {
			label: 'رقم الوارد الداخلي'
		 }
	},
	{
		accessorKey: 'internalIncomingDate',
		header: ({ column }) => (
			<TableColumnHeader column={column} title="تاريخ الوارد الداخلي" />
		),		meta: {
			label: 'تاريخ الوارد الداخلي'
		 }
	},
	{
		accessorKey: 'number',
		header: ({ column }) => (
			<TableColumnHeader column={column} title="العدد" />
		),		meta: {
			label: 'العدد'
		 }
	},
	{
		accessorKey: 'date',
		header: ({ column }) => (
			<TableColumnHeader column={column} title="تاريخ الكتاب" />
		),		meta: {
			label: 'تاريخ الكتاب'
		 }
	},
	{
		accessorKey: 'created',
		header: ({ column }) => (
			<TableColumnHeader column={column} title="تاريخ الانشاء" />
		),		meta: {
			label: 'تاريخ الانشاء'
		 }
	},
	{
		accessorKey: 'point',
		header: ({ column }) => (
			<TableColumnHeader column={column} title="اضيف بواسطة" />
		),		meta: {
			label: 'اضيف بواسطة'
		 }
	}
], [])
	
	return {
		booksColumns
	}

}