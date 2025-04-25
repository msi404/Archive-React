import { useShare } from '@/pages/(dashboard)/share/models'
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter
} from '@/shared/components/ui/card'
import { SkeletonTable } from '@/shared/components/table/skeleton-table'
import { DynamicPagination } from '@/shared/components/table/dynamic-pagination'
import { DynamicTable } from '@/shared/components'
import { FilterDialog } from '@/shared/components/table/filter-dialog'
import { Retry } from '@/shared/components/table/retry'
import { TableViewOptions } from '@/shared/components/table/table-view-options'
import { PinnedColumnsInputs } from '@/shared/components/table/pinned-column-inputs'
import { ColumnFilterInput } from '@/shared/components/table/column-filter-input'
import { For } from '@/shared/components/utils/for'
import { Switch, Match } from '@/shared/components/utils/switch'
import { Show } from '@/shared/components/utils/show'

export const ShareWidget = () => {
	const {
		isError,
		isFetching,
		isLoading,
		isSuccess,
		refetch,
		table,
		total,
		pinned,
		setPinned,
		savePinnedColumns,
		filteredColumns
	} = useShare()

	return (
		<Switch>
			<Match when={isSuccess}>
				<Card className="space-y-4 overflow-hidden w-[1130px] mx-auto max-w-full shadow-xl border">
					<CardHeader className="space-y-4">
						<div className="flex gap-3">
							<FilterDialog columns={table.getAllColumns()} />
							<TableViewOptions table={table} />
							<Retry refetch={refetch} />
						</div>
						<PinnedColumnsInputs
							pinned={pinned}
							setPinned={setPinned}
							savePinnedColumns={savePinnedColumns}
							table={table}
						/>
						<div className="flex flex-wrap gap-3">
							<For each={filteredColumns}>
								{(col) => (
									<Show when={pinned[col.id]}>
										<ColumnFilterInput key={col.id} column={col} />
									</Show>
								)}
							</For>
						</div>
					</CardHeader>
					<CardContent>
						<Switch>
							<Match when={!isFetching}>
								<DynamicTable table={table} />
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
