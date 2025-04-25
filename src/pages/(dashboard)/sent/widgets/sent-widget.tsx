import type { ReturnDocument } from '@/shared/api/archiveApi'
import { useSent } from '@/pages/(dashboard)/sent/models/use-sent'
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
import { EditShareDialog } from '@/pages/(dashboard)/sent/components/edit-share-dialog'
import { ColumnFilterInput } from '@/shared/components/table/column-filter-input'
import { For } from '@/shared/components/utils/for'
import { Switch, Match } from '@/shared/components/utils/switch'
import { Show } from '@/shared/components/utils/show'

export const SentWidget = () => {
	const {
		isError,
		isFetching,
		isLoading,
		isSuccess,
		refetch,
		table,
		total,
		editingRow,
		isLoadingUpdate,
		setEditingRow,
		deleteDocuemnt,
		pinned,
		setPinned,
		savePinnedColumns,
		filteredColumns
	} = useSent()

	const onUpdateDocument = async (updated: ReturnDocument) => {
		if (!editingRow?.id || !editingRow?.shareDocuments?.length) return

		// Get the documents that were removed (those in original but not in updated)
		const originalDocIds = new Set(
			editingRow.shareDocuments?.map((doc) => doc.id).filter(Boolean)
		)
		const updatedDocIds = new Set(
			updated.shareDocuments?.map((doc) => doc.id).filter(Boolean)
		)

		// Get IDs to delete - in original but not in updated
		const idsToDelete: string[] = []
		originalDocIds.forEach((id) => {
			if (id && !updatedDocIds.has(id)) {
				idsToDelete.push(id)
			}
		})

		// Only delete the selected documents
		if (idsToDelete.length > 0) {
			const deletePromises = idsToDelete.map((id) => deleteDocuemnt({ id }))

			await Promise.all(deletePromises)

			// Refetch to update the data
			refetch()
		}

		setEditingRow(null)
	}

	return (
		<Switch>
			<Match when={isSuccess}>
				<Card className="space-y-4 overflow-hidden w-[1130px] mx-auto max-w-full shadow-xl border">
					<Show when={editingRow !== null}>
						<EditShareDialog
							isLoading={isLoadingUpdate}
							open={!!editingRow}
							onClose={() => setEditingRow(null)}
							initialData={editingRow!}
							onSubmit={onUpdateDocument}
						/>
					</Show>
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
