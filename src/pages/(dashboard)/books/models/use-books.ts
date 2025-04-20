import { useGetApiDocumentQuery } from '@/shared/api/archiveApiEnhance'
import { useBooksTable, useBooksColumns } from '@/pages/(dashboard)/books/models'
import type { ReturnDocument } from '@/shared/api/archiveApi';

export const useBooks = (setEditingRow: (row: ReturnDocument) => void) => {

	const { booksColumns } = useBooksColumns(setEditingRow)
	const {
		table,
		pagination: { pageIndex, pageSize },
		columnFilters
	} = useBooksTable([], 0, booksColumns)

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
		refetch
	}
}