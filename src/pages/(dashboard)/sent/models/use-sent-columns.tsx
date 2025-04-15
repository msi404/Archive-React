import { useMemo } from 'react'
import type { ReturnDocument } from '@/shared/api/archiveApi'
import type { ColumnDef } from '@tanstack/react-table'
import { TableColumnHeader } from '@/shared/components/column-header'

export const useSentColumns = () => {
	const sentColumns: ColumnDef<ReturnDocument>[] = useMemo<
		ColumnDef<ReturnDocument>[]
	>(
		() => [
			{
				accessorKey: 'shareId',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="المعرف" />
				),
				enableSorting: true,
				meta: {
					label: 'المعرف'
				}
			},
			{
				accessorKey: 'fromUser',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="مرسل من" />
				),
				meta: {
					label: 'مرسل من'
				}
			},
			{
				accessorKey: 'toUser',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="مرسل الى" />
				),
				meta: {
					label: 'مرسل الى'
				}
			},
		],
		[]
	)

	return {
		sentColumns
	}
}
