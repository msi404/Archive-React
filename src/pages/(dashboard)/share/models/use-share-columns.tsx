import type { ReturnDocument } from '@/shared/api/archiveApi'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import * as Yup from 'yup'
import { useGetApiUserQuery } from '@/shared/api/archiveApi'
import { useDelete } from '@/pages/(dashboard)/books/models/use-delete'
import { TableColumnHeader } from '@/shared/components/table/column-header'
import { Badge } from '@/shared/components/ui/badge'
import { Show } from '@/shared/components/utils/show'
import { DeleteDialog } from '@/shared/components/table/delete-dialog'
import { Button } from '@/shared/components/ui/button'

export const useShareColumns = (
	setEditingRow: ( row: ReturnDocument ) => void,
	setShareRow: (row: ReturnDocument) => void
) => {
	const { data, isLoading: isLoadingUsers } = useGetApiUserQuery({})
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
				accessorKey: 'bookKind',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="تصنيف الكتاب" />
				),
				accessorFn: (row) => row.bookKind ?? 'لا يوجد',
				meta: {
					label: 'تصنيف الكتاب',
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
				accessorKey: 'destinationName',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="من / الى" />
				),
				accessorFn: (row) => row.destinationName ?? 'لا يوجد',
				meta: {
					label: 'من / الى',
					filterType: 'select',
					options: data?.result?.map((user) => user.name) ?? [],
					validation: Yup.string().required('هذا الحقل مطلوب')
				}
			},
			{
				accessorKey: 'concernedPerson',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="الشخص المعني" />
				),
				accessorFn: (row) => row.concernedPerson ?? 'لا يوجد',
				cell: ({ cell }) => (
					<Badge variant="outline">
						{String(cell.getValue() ?? 'لا يوجد')}
					</Badge>
				),
				meta: {
					label: 'الشخص المعني',
					validation: Yup.string().required('هذا الحقل مطلوب')
				}
			},
			{
				accessorKey: 'referencePerson',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="المعرف" />
				),
				accessorFn: (row) => row.referencePerson ?? 'لا يوجد',
				meta: {
					label: 'المعرف',
					validation: Yup.string().required('هذا الحقل مطلوب')
				}
			},
			{
				accessorKey: 'point',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="الجهة" />
				),
				accessorFn: (row) => row.point ?? 'لا يوجد',
				cell: ({ cell }) => (
					<Badge variant="outline">
						{String(cell.getValue() ?? 'لا يوجد')}
					</Badge>
				),
				meta: {
					label: 'الجهة',
					validation: Yup.string().required('هذا الحقل مطلوب')
				}
			},
			{
				accessorKey: 'documentAttachmentsCount',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="المرفقات" />
				),
				accessorFn: (row) => row.documentAttachmentsCount ?? 'لا يوجد',
				meta: {
					label: 'المرفقات',
					filterType: 'number',
					editable: false
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
					validation: Yup.date().required('هذا الحقل مطلوب')
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
				accessorKey: 'created',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="تاريخ الانشاء" />
				),
				accessorFn: (row) => row.created ?? 'لا يوجد',
				meta: {
					label: 'تاريخ الانشاء',
					filterable: false,
					pinnable: false,
					editable: false
				}
			},
			{
				accessorKey: 'point',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="اضيف بواسطة" />
				),
				accessorFn: (row) => row.point ?? 'لا يوجد',
				cell: ({ cell }) => (
					<Badge variant="outline">
						{String(cell.getValue() ?? 'لا يوجد')}
					</Badge>
				),
				meta: {
					label: 'اضيف بواسطة',
					validation: Yup.string().required('هذا الحقل مطلوب')
				}
			},
			{
				id: 'actions',
				header: 'الاجرائات',
				cell: ({ row }) => {
					const doc = row.original

					return (
						<div className="flex justify-between gap-3">
							<Button variant='secondary' onClick={() => setEditingRow(doc)}>
								تعديل
							</Button>
							<Button onClick={() => setShareRow(doc)}>
								مشاركة
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
		[isLoadingUsers]
	)

	return {
		shareColumns
	}
}
