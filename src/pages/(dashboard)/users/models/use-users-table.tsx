import { useState, useEffect } from 'react'
import {
	type ColumnFiltersState,
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	SortingState,
} from '@tanstack/react-table'
import type { ReturnUser } from '@/shared/api/archiveApi'
import { loadColumnVisibility, saveColumnVisibility } from '@/shared/lib/storage'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useUsersTable = ( data: ReturnUser[], pageCount: number, columns: any ) =>
{
	const [columnVisibility, setColumnVisibility] = useState(() => loadColumnVisibility())
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
			  right: [],
			},
		 },
		data,
		columns,
		pageCount,
		state: {
			pagination,
			columnFilters,
			sorting,
			columnVisibility
		},
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		onColumnFiltersChange: setColumnFilters,
		manualPagination: true,
		manualFiltering: true,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		renderFallbackValue: <h1>لا يوجد</h1>
	} )

	useEffect(() => {
		saveColumnVisibility(columnVisibility)
	}, [columnVisibility])
	
	
	useEffect(() => {
		setPagination(prev => ({ ...prev, pageIndex: 0 }))
	 }, [columnFilters])

	return { table, pagination, columnFilters }
}
