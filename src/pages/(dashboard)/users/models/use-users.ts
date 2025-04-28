import { useState } from 'react'
import { usePutApiUserByIdMutation, useGetApiUserQuery, usePostApiUserMutation } from '@/shared/api/archiveApiEnhance'
import { usePinnedColumnsInputs } from '@/shared/models/use-pinned-columns-inputs'
import { useUsersTable, useUsersColumns } from '@/pages/(dashboard)/users/models'
import type { ReturnUser, CreateUser } from '@/shared/api/archiveApi'

export const useUsers = () =>
{
	const [editingRow, setEditingRow] = useState<ReturnUser | null>(null)
	const [isCreating, setIsCreating] = useState(false)
	const { usersColumns } = useUsersColumns(setEditingRow)
	const {
		table,
		pagination: { pageIndex, pageSize },
		columnFilters
	} = useUsersTable([], 0, usersColumns)

		const { pinned, setPinned, savePinnedColumns } = usePinnedColumnsInputs(table)
		const filteredColumns = table
			.getAllColumns()
			.filter( ( col ) => col.getCanFilter() )
	
	const [updateUser, { isLoading: isLoadingUpdate }] =
		usePutApiUserByIdMutation({})
	const [createUser, { isLoading: isLoadingCreate }] = usePostApiUserMutation()
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

	const { data, isLoading, isError, isSuccess, isFetching,refetch } = useGetApiUserQuery({
		pageIndex: pageIndex + 1,
		pageSize,
		roleName: filters.role,
		userName: filters.name,
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
		updateUser,
		isLoadingUpdate,
		setEditingRow,
		isCreating,
		setIsCreating,
		createUser,
		isLoadingCreate
	}
}