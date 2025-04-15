import { useMemo } from 'react'
import type { ReturnDocument } from '@/shared/api/archiveApi'
import type { ColumnDef } from '@tanstack/react-table'
import { TableColumnHeader } from '@/shared/components/column-header'

export const useUsersColumns = () => {
	const shareColumns: ColumnDef<ReturnDocument>[] = useMemo<
		ColumnDef<ReturnDocument>[]
	>(
		() => [
			{
				accessorKey: 'name',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="الاسم" />
				),
				enableSorting: true,
				meta: {
					label: 'الاسم'
				}
			},
			{
				accessorKey: 'phoneNumber',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="رقم الهاتف" />
				),
				meta: {
					label: 'رقم الهاتف'
				}
			},
			{
				accessorKey: 'isActive',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="نوع الحساب" />
				),
				meta: {
					label: 'نوع الحساب'
				}
			},
			{
				accessorKey: 'role.ar_name',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="وظيفة" />
				),
				meta: {
					label: 'وظيفة'
				}
			},
		],
		[]
	)

	return {
		shareColumns
	}
}
