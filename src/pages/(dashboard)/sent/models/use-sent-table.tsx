import { useState, useEffect } from 'react'
import {
	type ColumnFiltersState,
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	SortingState
} from '@tanstack/react-table'
import type { ReturnDocument } from '@/shared/api/archiveApi'
import { useSentColumns } from '@/pages/(dashboard)/sent/models'

export const useSentTable = (data: ReturnDocument[], pageCount: number) => {
	const { sentColumns } = useSentColumns()
	const [sorting, setSorting] = useState<SortingState>([])
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10
	})
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const table = useReactTable({
		data,
		columns: sentColumns,
		pageCount,
		state: {
			pagination,
			columnFilters,
			sorting
		},
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		onColumnFiltersChange: setColumnFilters,
		manualPagination: true,
		manualFiltering: true,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		renderFallbackValue: <h1>لا يوجد</h1>
	} )
	
	useEffect(() => {
		setPagination(prev => ({ ...prev, pageIndex: 0 }))
	 }, [columnFilters])

	return { table, pagination, columnFilters }
}
