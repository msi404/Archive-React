import type { ReturnDocument } from '@/shared/api/archiveApi'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import * as Yup from 'yup'
import { useDelete } from '@/pages/(dashboard)/share/models'
import { TableColumnHeader } from '@/shared/components/table/column-header'
import { Badge } from '@/shared/components/ui/badge'
import { Show } from '@/shared/components/utils/show'
import { DeleteDialog } from '@/shared/components/table/delete-dialog'

export const useShareColumns = () => {
	const { onDelete, isLoading } = useDelete()
	const shareColumns: ColumnDef<ReturnDocument>[] = useMemo<
		ColumnDef<ReturnDocument>[]
	>(
		() => [
			{
				accessorKey: 'titleName',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="الموضوع" />
				),
				accessorFn: (row) => row.titleName ?? 'لا يوجد',
				meta: {
					label: 'الموضوع',
					pinned: true,
					validation: Yup.string().required('هذا الحقل مطلوب')
				}
			},
			{
				accessorKey: 'type',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="نوع الكتاب" />
				),
				cell: ({ cell }) => (
					<Show
						when={cell.getValue() === 'وارد'}
						fallback={
							<Badge variant="destructive">
								{String(cell.getValue() ?? 'لا يوجد')}
							</Badge>
						}
					>
						<Badge variant="success">
							{String(cell.getValue() ?? 'لا يوجد')}
						</Badge>
					</Show>
				),
				accessorFn: (row) => (row.type === 1 ? 'وارد' : 'صادر'),
				meta: {
					label: 'نوع الكتاب',
					filterable: false,
					pinnable: false,
					validation: Yup.string().required('هذا الحقل مطلوب'),
					filterType: 'select',
					options: [
						{ label: 'وارد', value: '1' },
						{ label: 'صادر', value: '2' }
					]
				}
			},
			{
				accessorKey: 'internalIncoming',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="رقم الوارد الداخلي" />
				),
				accessorFn: (row) => row.internalIncoming ?? 'لا يوجد',
				meta: {
					label: 'رقم الوارد الداخلي',
					validation: Yup.number().required('هذا الحقل مطلوب')
				}
			},
			{
				accessorKey: 'internalIncomingDate',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="تاريخ الوارد الداخلي" />
				),
				accessorFn: (row) => row.internalIncomingDate ?? 'لا يوجد',
				meta: {
					label: 'تاريخ الوارد الداخلي',
					filterType: 'date',
					filterable: false,
					pinnable: false,
					editable: false
				}
			},
			{
				accessorKey: 'shareDocuments[0].created',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="تاريخ الارسال" />
				),
				accessorFn: (row) => row.internalIncomingDate ?? 'لا يوجد',
				meta: {
					label: 'تاريخ الارسال',
					filterable: false,
					pinnable: false,
					editable: false
				}
			},
			{
				accessorKey: 'number',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="العدد" />
				),
				accessorFn: (row) => row.number ?? 'لا يوجد',
				meta: {
					label: 'العدد',
					validation: Yup.number().required('هذا الحقل مطلوب')
				}
			},
			{
				accessorKey: 'date',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="تاريخ الكتاب" />
				),
				accessorFn: (row) => row.date ?? 'لا يوجد',
				meta: {
					label: 'تاريخ الكتاب',
					filterType: 'date',
					validation: Yup.date().required('هذا الحقل مطلوب')
				}
			},
			{
				accessorKey: 'point',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="مرسل من" />
				),
				accessorFn: (row) => row.point ?? 'لا يوجد',
				cell: ({ cell }) => (
					<Badge variant="outline">
						{String(cell.getValue() ?? 'لا يوجد')}
					</Badge>
				),
				meta: {
					label: 'مرسل من',
					filterable: false,
					pinnable: false,
					editable: false
				}
			},
			{
				id: 'actions',
				header: 'الاجرائات',
				cell: ({ row }) => {
					const doc = row.original

					return (
						<div className="flex justify-between gap-3">
							<DeleteDialog
								isLoading={isLoading}
								action={() => onDelete(doc.id!)}
							/>
						</div>
					)
				},
				meta: {
					label: 'الاجرائات',
					filterable: false,
					pinnable: false,
					editable: false
				}
			}
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	return {
		shareColumns
	}
}
