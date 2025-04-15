import { useMemo } from 'react'
import type { ReturnDocument } from '@/shared/api/archiveApi'
import type { ColumnDef } from '@tanstack/react-table'
import { TableColumnHeader } from '@/shared/components/column-header'

export const useShareColumns = () => {
	const shareColumns: ColumnDef<ReturnDocument>[] = useMemo<
		ColumnDef<ReturnDocument>[]
	>(
		() => [
			{
				accessorKey: 'documentId',
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
		shareColumns
	}
}
