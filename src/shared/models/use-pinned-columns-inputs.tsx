/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { loadPinnedColumns, savePinnedColumns } from '@/shared/lib/storage'


export const usePinnedColumnsInputs = (table: any) =>
{
	const [pinned, setPinned] = useState<Record<string, boolean>>(() => {
		const stored = loadPinnedColumns()
		const initial: Record<string, boolean> = {}
		table.getAllColumns().forEach((col: any) => {
			initial[col.id] = stored[col.id] ?? col.columnDef.meta?.pinned ?? false
		})
		return initial
	})
	
	
	return {
		pinned,
		setPinned,
		savePinnedColumns
	}
}