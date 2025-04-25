import { useSelector } from 'react-redux'
import { selectUser } from '@/shared/lib/features/authSlice'
import { useGetApiDocumentQuery } from '@/shared/api/archiveApiEnhance'
import { usePinnedColumnsInputs } from '@/shared/models/use-pinned-columns-inputs'
import {
	useShareTable,
	useShareColumns
} from '@/pages/(dashboard)/share/models'

export const useShare = () => {
	const { id } = useSelector(selectUser)
	const { shareColumns } = useShareColumns()
	const {
		table,
		pagination: { pageIndex, pageSize },
		columnFilters
	} = useShareTable([], 0, shareColumns)

	const { pinned, setPinned, savePinnedColumns } = usePinnedColumnsInputs(table)
	const filteredColumns = table
		.getAllColumns()
		.filter((col) => col.getCanFilter())

	const filters = columnFilters.reduce(
		(acc, curr) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			acc[curr.id] = curr.value
			return acc
		},
		{} as Record<string, string>
	)

	const { data, isLoading, isError, isSuccess, isFetching, refetch } =
		useGetApiDocumentQuery({
			pageIndex: pageIndex + 1,
			pageSize,
			shareToUserId: String(id),
			...filters
		})

	const result = data?.result ?? []
	const total = data?.count ?? 0
	const pageCount = Math.ceil(total / pageSize)

	table.setOptions((prev) => ({
		...prev,
		data: result,
		pageCount
	}))

	return {
		table,
		total,
		isLoading,
		isError,
		isFetching,
		isSuccess,
		refetch,
		pinned,
		setPinned,
		savePinnedColumns,
		filteredColumns
	}
}
