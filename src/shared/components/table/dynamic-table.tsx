/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CSSProperties, FC } from 'react'
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
 
import { Button } from '@/shared/components/ui/button'
import { For } from '@/shared/components/utils/for'
import { Show } from '@/shared/components/utils/show'

interface DynamicTableProps {
	table: any
}

export const DynamicTable: FC<DynamicTableProps> = ( { table } ) =>
{
	
	const getCommonPinningStyles = (column: any): CSSProperties => {
		const isPinned = column.getIsPinned()
	
		const isLastLeftPinnedColumn =
			isPinned === 'left' && column.getIsLastColumn('left')
		const isFirstRightPinnedColumn =
			isPinned === 'right' && column.getIsFirstColumn('right')
	
		return {
			boxShadow: isLastLeftPinnedColumn
				? '4px 0 4px -4px gray inset'
				: isFirstRightPinnedColumn
				? '-4px 0 4px -4px gray inset'
				: undefined,
	
			left:
				isPinned === 'right'
					? `${column.getStart('right')}px`
					: isPinned === 'left'
					? `${column.getStart('left')}px`
					: undefined,
	
			position: isPinned ? 'sticky' : 'relative',
			width: column.getSize(),
			zIndex: isPinned ? 5 : 'auto',
			background: 'white',
			opacity: isPinned ? 0.98 : 1
		}
	}
	
	return (
		<Fragment>
			<div className='border shadow relative overflow-x-scroll'>
				<Table style={{width: table.getTotalSize()}}>
					<TableHeader className="bg-secondary">
						<For each={table.getHeaderGroups()}>
							{(headerGroup: any) => (
								<TableRow key={headerGroup.id}>
									<For each={headerGroup.headers}>
										{(header: any) => (
											<TableHead style={{...getCommonPinningStyles(header.column)}} className="text-start" key={header.id}>
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
										className="border-b even:bg-slate-50 dark:even:bg-slate-900 h-16 rounded-lg"
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}
									>
										<For each={row.getVisibleCells()}>
											{(cell: any) => (
												<TableCell style={{...getCommonPinningStyles(cell.column)}} key={cell.id}>
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

				<div className="flex justify-between items-center p-4">
					<div>
						<Button variant="ghost">
							صفحة {table.getState().pagination.pageIndex + 1} من{' '}
							{table.getPageCount()}
						</Button>
					</div>
					<div className="flex gap-2">
						<Button
							variant="outline"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							السابق
						</Button>
						<Button
							variant="outline"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							التالي
						</Button>
					</div>
				</div>
			</div>
		</Fragment>
	)
}
