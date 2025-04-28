import type { ReturnUser, CreateUser } from '@/shared/api/archiveApi';
import { useUsers } from '@/pages/(dashboard)/users/models';
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
import { EditDialog } from '@/shared/components/table/edit-dialog'
import { ColumnFilterInput } from '@/shared/components/table/column-filter-input'
import { For } from '@/shared/components/utils/for'
import { Switch, Match } from '@/shared/components/utils/switch'
import { Show } from '@/shared/components/utils/show'
import { CreateDialog } from '@/shared/components/table/create-dialog'
import { Button } from '@/shared/components/ui/button'
import { toast } from 'sonner'

export const UsersWidget = () => {
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
		updateUser,
		pinned,
		setPinned,
		savePinnedColumns,
		filteredColumns,
		isCreating,
		setIsCreating,
		createUser,
		isLoadingCreate
	} = useUsers()

	const onUpdateDocument = async (updated: ReturnUser) =>
	{
			if (!editingRow?.id) return

			await updateUser({id: editingRow.id, updateUser: updated})
			setEditingRow(null)
	}

	const onCreateDocument = async (newData: CreateUser) => {
		try {
			await createUser({ createUser: newData }).unwrap()
			toast.success('تم إنشاء المستخدم بنجاح')
			refetch()
		} catch (error) {
			console.error('Failed to create user:', error)
			toast.error('فشل في إنشاء المستخدم')
		}
	}
	
	return (
		<Switch>
			<Match when={isSuccess}>
				<Card className="space-y-4 overflow-hidden w-[1130px] mx-auto max-w-full shadow-xl border">
					<Show when={editingRow !== null}>
						<EditDialog
							isLoading={isLoadingUpdate}
							open={!!editingRow}
							onClose={() => setEditingRow(null)}
							initialData={editingRow!}
							onSubmit={onUpdateDocument}
							columns={table.getAllColumns()}
						/>
					</Show>
					<Show when={isCreating}>
						<CreateDialog
							isLoading={isLoadingCreate}
							open={isCreating}
							onClose={() => setIsCreating(false)}
							onSubmit={onCreateDocument}
							columns={table.getAllColumns()}
						/>
					</Show>
					<CardHeader className="space-y-4">
						<div className="flex gap-3">
							<Button onClick={() => setIsCreating(true)}>إنشاء مستخدم جديد</Button>
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
