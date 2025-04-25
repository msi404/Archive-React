import { useState } from 'react'
import { useSelector } from 'react-redux'
import {selectUser} from '@/shared/lib/features/authSlice'
import { useDeleteApiShareDocumentByIdMutation } from '@/shared/api/archiveApi'
import { useGetApiDocumentQuery } from '@/shared/api/archiveApiEnhance';
import { usePinnedColumnsInputs } from '@/shared/models/use-pinned-columns-inputs'
import { useSentTable, useSentColumns } from '@/pages/(dashboard)/sent/models'
import type { ReturnDocument } from '@/shared/api/archiveApi';

export const useSent = () =>
{
	const { id } = useSelector(selectUser)
	const [editingRow, setEditingRow] = useState<ReturnDocument | null>(null)
	const { sentColumns } = useSentColumns(setEditingRow)
	const {
		table,
		pagination: { pageIndex, pageSize },
		columnFilters
	} = useSentTable([], 0, sentColumns)

		const { pinned, setPinned, savePinnedColumns } = usePinnedColumnsInputs(table)
		const filteredColumns = table
			.getAllColumns()
			.filter( ( col ) => col.getCanFilter() )
	
	const [deleteDocuemnt, { isLoading: isLoadingUpdate }] =
	useDeleteApiShareDocumentByIdMutation({})
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
		shareFromUserId: String(id),
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
		pinned,
		setPinned,
		savePinnedColumns,
		filteredColumns,
		deleteDocuemnt,
		isLoadingUpdate,
		setEditingRow,
	}
}