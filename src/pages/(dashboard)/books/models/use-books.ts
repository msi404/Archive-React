import { useGetApiDocumentQuery } from '@/shared/api/archiveApi'
import { useBooksTable } from '@/pages/(dashboard)/books/models'

export const useBooks = () =>
{
	const {
		table,
		pagination: { pageIndex, pageSize },
		columnFilters
	} = useBooksTable([], 0)

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