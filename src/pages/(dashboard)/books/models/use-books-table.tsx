import { useState } from 'react'
import {
	type ColumnFiltersState,
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel
} from '@tanstack/react-table'
import type { ReturnDocument } from '@/shared/api/archiveApi'
import { useBooksColumns } from '@/pages/(dashboard)/books/models'

export const useBooksTable = (data: ReturnDocument[], pageCount: number) => {
	const { booksColumns } = useBooksColumns()
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10
	})
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const table = useReactTable({
		data,
		columns: booksColumns,
		pageCount,
		state: {
			pagination,
			columnFilters
		},
		onPaginationChange: setPagination,
		onColumnFiltersChange: setColumnFilters,
		manualPagination: true,
		manualFiltering: true,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		renderFallbackValue: <h1>لا يوجد</h1>
	})

	return { table, pagination, columnFilters }
}
