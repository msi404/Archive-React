import { useGetApiDocumentQuery } from '@/shared/api/archiveApi'
import { useBooksTable } from '@/pages/(dashboard)/books/models'
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter
} from '@/shared/components/ui/card'
import { SkeletonTable } from '@/shared/components/skeleton-table'
import { DynamicPagination } from '@/shared/components/dynamic-pagination'
import { DynamicTable } from '@/shared/components'
import { FilterDialog } from '@/shared/components/filter-dialog'
import { TableViewOptions } from '@/shared/components/table-view-options'
import { Switch, Match } from '@/shared/components/utils/switch'

export default function BooksPage() {
	// review
	const {
		table,
		pagination: { pageIndex, pageSize },
		columnFilters
	} = useBooksTable([], 0)

	// review
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

	const { data, isLoading, isError, isSuccess } = useGetApiDocumentQuery({
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

	return (
		<Switch>
			<Match when={isSuccess}>
				<Card className="space-y-4 overflow-hidden w-[1130px] mx-auto max-w-full shadow-xl border">
					<CardHeader>
						<div className="flex gap-3">
							<FilterDialog columns={table.getAllColumns()} />
							<TableViewOptions table={table} />
						</div>
					</CardHeader>
					<CardContent>
						<DynamicTable table={table} />
					</CardContent>
					<CardFooter className='flex justify-center'>
						<DynamicPagination table={table} total={total} />
					</CardFooter>
				</Card>
			</Match>
			<Match when={isLoading}>
				<SkeletonTable />
			</Match>
			<Match when={isError}>
				<p>فشل في التحميل</p>
			</Match>
		</Switch>
	)
}
