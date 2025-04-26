import type { ReturnDocument } from '@/shared/api/archiveApi'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import * as Yup from 'yup'
import { useDelete } from '@/pages/(dashboard)/sent/models'
import { TableColumnHeader } from '@/shared/components/table/column-header'
import { Badge } from '@/shared/components/ui/badge'
import { Show } from '@/shared/components/utils/show'
import { DeleteDialog } from '@/shared/components/table/delete-dialog'
import { Button } from '@/shared/components/ui/button'

export const useSentColumns = (
	setEditingRow: (row: ReturnDocument) => void
) => {
	const { onDelete, isLoading } = useDelete()
	const sentColumns: ColumnDef<ReturnDocument>[] = useMemo<
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
				accessorKey: 'shareDocuments',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="مرسل الى" />
				),
				accessorFn: (row) => {
					if (!row.shareDocuments?.length) return 'لا يوجد'
					return row.shareDocuments.map((doc) => doc.toUser?.name).join(', ')
				},
				cell: ({ row }) => {
					const shareDocuments = row.original.shareDocuments || []

					return (
						<div className="flex w-96 flex-wrap gap-2">
							{shareDocuments.length > 0 ? (
								shareDocuments.map((doc, index) => (
									<Badge key={index} variant="outline">
										{doc.toUser?.name || 'لا يوجد'}
									</Badge>
								))
							) : (
								<Badge variant="outline">لا يوجد</Badge>
							)}
						</div>
					)
				},
				meta: {
					label: 'مرسل من',
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
				id: 'actions',
				header: 'الاجرائات',
				cell: ({ row }) => {
					const doc = row.original

					return (
						<div className="flex justify-between gap-3">
							<Button variant="secondary" onClick={() => setEditingRow(doc)}>
								تعديل
							</Button>
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
		sentColumns
	}
}
