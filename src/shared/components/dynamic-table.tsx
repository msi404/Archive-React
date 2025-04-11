/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from 'react'
import { Fragment } from 'react'
import { flexRender } from '@tanstack/react-table'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/shared/components/ui/table'
// import {TableViewOptions} from '@/shared/components/table-view-options'
import { For } from '@/shared/components/utils/for'
import { Show } from '@/shared/components/utils/show'

interface DynamicTableProps {
	table: any
}

export const DynamicTable: FC<DynamicTableProps> = ({ table }) => {
	return (
		<Fragment>
			{/* <TableViewOptions table={table}/> */}
			<div className="overflow-hidden border w-[1130px] mx-auto max-w-full rounded-xl shadow-2xl">
				<Table>
					<TableHeader className="bg-secondary">
						<For each={table.getHeaderGroups()}>
							{(headerGroup: any) => (
								<TableRow key={headerGroup.id}>
									<For each={headerGroup.headers}>
										{(header: any) => (
											<TableHead className="text-start" key={header.id}>
												<Show when={!header.isPlaceholder} fallback={null}>
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
												</Show>
											</TableHead>
										)}
									</For>
								</TableRow>
							)}
						</For>
					</TableHeader>
					<TableBody>
						<Show
							when={table.getRowModel().rows?.length > 0}
							fallback={
								<TableRow>
									<TableCell colSpan={10} className="h-24 text-center">
										لا توجد بيانات
									</TableCell>
								</TableRow>
							}
						>
							<For each={table.getRowModel().rows}>
								{(row: any) => (
									<TableRow
										className="even:bg-slate-50 dark:even:bg-slate-900 rounded-lg border-none"
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}
									>
										<For each={row.getVisibleCells()}>
											{(cell: any) => (
												<TableCell key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</TableCell>
											)}
										</For>
									</TableRow>
								)}
							</For>
						</Show>
					</TableBody>
				</Table>
			</div>
		</Fragment>
	)
}
