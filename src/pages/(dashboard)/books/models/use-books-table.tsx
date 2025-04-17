import { useState, useEffect } from 'react'
import {
	type ColumnFiltersState,
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	SortingState,
} from '@tanstack/react-table'
import type { ReturnDocument } from '@/shared/api/archiveApi'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useBooksTable = ( data: ReturnDocument[], pageCount: number, columns: any ) =>
{
	const [sorting, setSorting] = useState<SortingState>([])
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10
	})
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const table = useReactTable( {
		initialState: {
			columnPinning: {
			  left: [],
			  right: ['actions'],
			},
		 },
		data,
		columns,
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
