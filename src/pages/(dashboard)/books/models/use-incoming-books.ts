import { useState } from 'react'
import { usePutApiDocumentByIdMutation } from '@/shared/api/archiveApiEnhance'
import { useGetApiDocumentQuery } from '@/shared/api/archiveApiEnhance';
import { usePinnedColumnsInputs } from '@/shared/models/use-pinned-columns-inputs'
import { useBooksTable, useBooksColumns } from '@/pages/(dashboard)/books/models'
import type { ReturnDocument } from '@/shared/api/archiveApi';

export const useIncomingBooks = () =>
{
	const [editingRow, setEditingRow] = useState<ReturnDocument | null>(null)
	const [ shareRow, setShareRow ] = useState<ReturnDocument | null>( null )
	const { booksColumns } = useBooksColumns(setEditingRow, setShareRow)
	const {
		table,
		pagination: { pageIndex, pageSize },
		columnFilters
	} = useBooksTable([], 0, booksColumns)

		const { pinned, setPinned, savePinnedColumns } = usePinnedColumnsInputs(table)
		const filteredColumns = table
			.getAllColumns()
			.filter( ( col ) => col.getCanFilter() )
	
	const [updateDocuemnt, { isLoading: isLoadingUpdate }] =
		usePutApiDocumentByIdMutation({})
	const filters = columnFilters.reduce(
		( acc, curr ) =>
		{
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			acc[curr.id] = curr.value
			return acc
		},
		{} as Record<string, string>
	)

	const { data, isLoading, isError, isSuccess, isFetching,refetch } = useGetApiDocumentQuery({
		pageIndex: pageIndex + 1,
		pageSize,
		type: 1,
		...filters
	})

	const result = data?.result ?? []
	const total = data?.count ?? 0
	const pageCount = Math.ceil(total / pageSize)

	table.setOptions((prev) => ({
		...prev,
		data: result,
		pageCount
	} ) )
	
	return {
		table,
		total,
		isLoading,
		isError,
		isFetching,
		isSuccess,
		refetch,
		editingRow,
		shareRow,
		pinned,
		setPinned,
		savePinnedColumns,
		filteredColumns,
		updateDocuemnt,
		isLoadingUpdate,
		setEditingRow,
		setShareRow
	}
}