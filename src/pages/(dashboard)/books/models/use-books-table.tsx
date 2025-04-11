import {
	useReactTable,
	getCoreRowModel,
	type Table
} from '@tanstack/react-table'
import type { ReturnDocument } from '@/shared/api/archiveApi'
import { useBooksColumns } from '@/pages/(dashboard)/books/models'

export const useBooksTable = (
	data: ReturnDocument[]
): Table<ReturnDocument> => {
	const { booksColumns } = useBooksColumns()

	const booksTable = useReactTable({
		data,
		columns: booksColumns,
		getCoreRowModel: getCoreRowModel(),
		renderFallbackValue: <h1>لا يوجد</h1>
	})

	return booksTable
}
