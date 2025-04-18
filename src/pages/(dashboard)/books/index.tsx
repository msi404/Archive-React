import { useBooks } from '@/pages/(dashboard)/books/models';
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
import {Retry} from '@/shared/components/retry'
import { TableViewOptions } from '@/shared/components/table-view-options'
import { Switch, Match } from '@/shared/components/utils/switch'
export default function BooksPage ()
{
	const { isError, isFetching, isLoading, isSuccess, refetch, table, total } =
		useBooks()
		return (
			<Switch>
			<Match when={isSuccess}>
				<Card className="space-y-4 overflow-hidden w-[1130px] mx-auto max-w-full shadow-xl border">
					<CardHeader>
							<div className="flex gap-3">
							<FilterDialog columns={table.getAllColumns()} />
							<TableViewOptions table={table} />
							<Retry refetch={refetch}/>
						</div>
					</CardHeader>
					<CardContent>
						<Switch>
							<Match when={!isFetching}>
									<DynamicTable table={ table } />
							</Match>
							<Match when={isFetching}>
								<SkeletonTable />
							</Match>
						</Switch>
					</CardContent>
					<CardFooter className="flex justify-center">
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
