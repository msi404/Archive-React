/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react'
import { loadPinnedColumns as load, savePinnedColumns as save } from '@/shared/lib/storage'

export const usePinnedColumnsInputs = (table: any) => {
	const [pinned, setPinned] = useState<Record<string, boolean>>(() => {
		const stored = load()
		const initial: Record<string, boolean> = {}
		table.getAllColumns().forEach((col: any) => {
			initial[col.id] = stored[col.id] ?? col.columnDef.meta?.pinned ?? false
		})
		return initial
	})

	const savePinned = useCallback((value: Record<string, boolean>) => {
		save(value)
	}, [])

	return {
		pinned,
		setPinned,
		savePinnedColumns: savePinned
	}
}
