import { useGetApiDocumentQuery } from '@/shared/api/archiveApi'
import { useBooksTable } from '@/pages/(dashboard)/books/models'
import { PaginationFooter } from '@/shared/components/pagination-footer'
import { DynamicTable } from '@/shared/components'
import { FilterDialog } from '@/shared/components/filter-dialog'
export default function BooksPage() {
	// review
	const {
		table,
		pagination: { pageIndex, pageSize },
		columnFilters
	} = useBooksTable([], 0)

	// review
	const filters = columnFilters.reduce(
		(acc, curr) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-expect-error
			acc[curr.id] = curr.value
			return acc
		},
		{} as Record<string, string>
	)

	const { data, isLoading, isError } = useGetApiDocumentQuery({
		pageIndex: pageIndex + 1,
		pageSize,
		...filters
	})

	// review
	const result = data?.result ?? []
	const total = data?.count ?? 0
	const pageCount = Math.ceil(total / pageSize)

	// review
	table.setOptions((prev) => ({
		...prev,
		data: result,
		pageCount
	}))
	// review
	if (isLoading) return <p>تحميل...</p>
	if (isError) return <p>فشل في التحميل</p>

	return (
		<div className="space-y-4 overflow-hidden w-[1130px] mx-auto max-w-full">
			<FilterDialog
				columns={table.getAllColumns()}
				columnFilters={table.getState().columnFilters}
				setColumnFilters={table.setColumnFilters}
			/>
			<DynamicTable table={table} />
			<PaginationFooter table={table} totalItems={total} />
		</div>
	)
}
