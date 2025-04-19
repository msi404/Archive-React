/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react'
import type { Column } from '@tanstack/react-table'

export const usePinnedColumnsInputs = (table: any) =>
{
	const [pinned, setPinned] = useState<Record<string, boolean>>(() => {
		 const initial: Record<string, boolean> = {}
		table.getAllColumns().forEach( ( col: Column<any, any> ) =>
		{
			 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
			 //@ts-expect-error
			if (col.columnDef.meta?.pinned) initial[col.id] = true
		 })
		 return initial
	} )
	
	return {
		pinned,
		setPinned
	}
}