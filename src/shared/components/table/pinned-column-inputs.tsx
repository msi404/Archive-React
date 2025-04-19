/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Column } from '@tanstack/react-table'
import type { FC } from 'react'
import { Button } from '@/shared/components/ui/button'
import { For } from '@/shared/components/utils/for'

export const PinnedColumnsInputs: FC<{ table: any; pinned: Record<string, boolean>, setPinned: any}> = ( { table, pinned, setPinned } ) =>
{
	return (
		<div className="space-y-4">
			<div className="flex flex-wrap gap-2">
				<For each={table.getAllColumns()}>
					{(col: Column<any, any>) => (
						<Button
							key={ col.id }
							variant={ pinned[ col.id ] ? 'default' : 'outline' }
							onClick={ () =>
							{
								setPinned( ( prev: any ) => ( {
									...prev,
									[col.id]: !prev[col.id]
								}))
							}}
						>
							{col.columnDef.meta?.label ?? col.id}
						</Button>
					)}
				</For>
			</div>
		</div>
	)
}
