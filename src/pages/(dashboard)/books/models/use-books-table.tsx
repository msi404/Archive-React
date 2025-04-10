import { useReactTable, getCoreRowModel, type Table } from '@tanstack/react-table'
import { booksColumns, type BookType } from '@/pages/(dashboard)/books/config'

export const useBooksTable = (data: BookType[]): Table<BookType> =>
{
	const booksTable = useReactTable( {
		data,
		columns: booksColumns,
		getCoreRowModel: getCoreRowModel()
	} )
	
	return booksTable
}