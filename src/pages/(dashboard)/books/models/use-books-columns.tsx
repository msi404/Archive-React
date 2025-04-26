import type { ReturnDocument } from '@/shared/api/archiveApi'
import type {
	ColumnDef,
	CellContext,
	HeaderContext
} from '@tanstack/react-table'
import { useMemo } from 'react'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { selectUser } from '@/shared/lib/features/authSlice'
import { defineAbilitiesFor } from '@/shared/config/ability'
import { useGetApiUserQuery } from '@/shared/api/archiveApi'
import { useDelete } from '@/pages/(dashboard)/books/models'
import { TableColumnHeader } from '@/shared/components/table/column-header'
import { Badge } from '@/shared/components/ui/badge'
import { Show } from '@/shared/components/utils/show'
import { DeleteDialog } from '@/shared/components/table/delete-dialog'
import { Button } from '@/shared/components/ui/button'

export const useBooksColumns = (
	setEditingRow: (row: ReturnDocument) => void,
	setShareRow: (row: ReturnDocument) => void
) => {
	const { data, isLoading: isLoadingUsers } = useGetApiUserQuery({})
	const { onDelete, isLoading } = useDelete()
	const user = useSelector(selectUser)
	const ability = defineAbilitiesFor(user)

	const booksColumns: ColumnDef<ReturnDocument>[] = useMemo<
		ColumnDef<ReturnDocument>[]
	>(() => {
		const baseColumns: ColumnDef<ReturnDocument>[] = [
			{
				accessorKey: 'titleName',
				header: ({ column }: HeaderContext<ReturnDocument, unknown>) => (
					<TableColumnHeader column={column} title="الموضوع" />
				),
				accessorFn: (row: ReturnDocument) => row.titleName ?? 'لا يوجد',
				meta: {
					label: 'الموضوع',
					pinned: true,
					validation: Yup.string().required('هذا الحقل مطلوب')
				}
			},
			{
				accessorKey: 'bookKind',
				header: ({ column }: HeaderContext<ReturnDocument, unknown>) => (
					<TableColumnHeader column={column} title="تصنيف الكتاب" />
				),
				accessorFn: (row: ReturnDocument) => row.bookKind ?? 'لا يوجد',
				meta: {
					label: 'تصنيف الكتاب',
					validation: Yup.string().required('هذا الحقل مطلوب')
				}
			},
			{
				accessorKey: 'type',
				header: ({ column }: HeaderContext<ReturnDocument, unknown>) => (
					<TableColumnHeader column={column} title="نوع الكتاب" />
				),
				cell: ({ cell }: CellContext<ReturnDocument, unknown>) => (
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
				accessorFn: (row: ReturnDocument) => (row.type === 1 ? 'وارد' : 'صادر'),
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
				header: ({ column }: HeaderContext<ReturnDocument, unknown>) => (
					<TableColumnHeader column={column} title="من / الى" />
				),
				accessorFn: (row: ReturnDocument) => row.destinationName ?? 'لا يوجد',
				meta: {
					label: 'من / الى',
					filterType: 'select',
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					options: data?.result?.map((user: any) => user.name as string) ?? [],
					validation: Yup.string().required('هذا الحقل مطلوب')
				}
			},
			{
				accessorKey: 'concernedPerson',
				header: ({ column }: HeaderContext<ReturnDocument, unknown>) => (
					<TableColumnHeader column={column} title="الشخص المعني" />
				),
				accessorFn: (row: ReturnDocument) => row.concernedPerson ?? 'لا يوجد',
				cell: ({ cell }: CellContext<ReturnDocument, unknown>) => (
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
				header: ({ column }: HeaderContext<ReturnDocument, unknown>) => (
					<TableColumnHeader column={column} title="المعرف" />
				),
				accessorFn: (row: ReturnDocument) => row.referencePerson ?? 'لا يوجد',
				meta: {
					label: 'المعرف',
					validation: Yup.string().required('هذا الحقل مطلوب')
				}
			},
			{
				accessorKey: 'point',
				header: ({ column }: HeaderContext<ReturnDocument, unknown>) => (
					<TableColumnHeader column={column} title="الجهة" />
				),
				accessorFn: (row: ReturnDocument) => row.point ?? 'لا يوجد',
				cell: ({ cell }: CellContext<ReturnDocument, unknown>) => (
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
				header: ({ column }: HeaderContext<ReturnDocument, unknown>) => (
					<TableColumnHeader column={column} title="المرفقات" />
				),
				accessorFn: (row: ReturnDocument) =>
					row.documentAttachmentsCount ?? 'لا يوجد',
				meta: {
					label: 'المرفقات',
					filterType: 'number',
					editable: false
				}
			},
			{
				accessorKey: 'internalIncoming',
				header: ({ column }: HeaderContext<ReturnDocument, unknown>) => (
					<TableColumnHeader column={column} title="رقم الوارد الداخلي" />
				),
				accessorFn: (row: ReturnDocument) => row.internalIncoming ?? 'لا يوجد',
				meta: {
					label: 'رقم الوارد الداخلي',
					validation: Yup.number().required('هذا الحقل مطلوب')
				}
			},
			{
				accessorKey: 'internalIncomingDate',
				header: ({ column }: HeaderContext<ReturnDocument, unknown>) => (
					<TableColumnHeader column={column} title="تاريخ الوارد الداخلي" />
				),
				accessorFn: (row: ReturnDocument) =>
					row.internalIncomingDate ?? 'لا يوجد',
				meta: {
					label: 'تاريخ الوارد الداخلي',
					filterType: 'date',
					validation: Yup.date().required('هذا الحقل مطلوب')
				}
			},
			{
				accessorKey: 'number',
				header: ({ column }: HeaderContext<ReturnDocument, unknown>) => (
					<TableColumnHeader column={column} title="العدد" />
				),
				accessorFn: (row: ReturnDocument) => row.number ?? 'لا يوجد',
				meta: {
					label: 'العدد',
					validation: Yup.number().required('هذا الحقل مطلوب')
				}
			},
			{
				accessorKey: 'date',
				header: ({ column }: HeaderContext<ReturnDocument, unknown>) => (
					<TableColumnHeader column={column} title="تاريخ الكتاب" />
				),
				accessorFn: (row: ReturnDocument) => row.date ?? 'لا يوجد',
				meta: {
					label: 'تاريخ الكتاب',
					filterType: 'date',
					validation: Yup.date().required('هذا الحقل مطلوب')
				}
			},
			{
				accessorKey: 'created',
				header: ({ column }: HeaderContext<ReturnDocument, unknown>) => (
					<TableColumnHeader column={column} title="تاريخ الانشاء" />
				),
				accessorFn: (row: ReturnDocument) => row.created ?? 'لا يوجد',
				meta: {
					label: 'تاريخ الانشاء',
					filterable: false,
					pinnable: false,
					editable: false
				}
			},
			{
				accessorKey: 'point',
				header: ({ column }: HeaderContext<ReturnDocument, unknown>) => (
					<TableColumnHeader column={column} title="اضيف بواسطة" />
				),
				accessorFn: (row: ReturnDocument) => row.point ?? 'لا يوجد',
				cell: ({ cell }: CellContext<ReturnDocument, unknown>) => (
					<Badge variant="outline">
						{String(cell.getValue() ?? 'لا يوجد')}
					</Badge>
				),
				meta: {
					label: 'اضيف بواسطة',
					validation: Yup.string().required('هذا الحقل مطلوب')
				}
			}
		]

		const actionsColumn: ColumnDef<ReturnDocument> = {
			id: 'actions',
			header: 'الاجرائات',
			cell: ({ row }: CellContext<ReturnDocument, unknown>) => {
				const doc = row.original

				return (
					<div className="flex justify-between gap-3">
						<Show when={ability.can('update', 'BooksPage')}>
							<Button variant="secondary" onClick={() => setEditingRow(doc)}>
								تعديل
							</Button>
						</Show>
						<Show when={ability.can('update', 'BooksPage')}>
							<Button onClick={() => setShareRow(doc)}>مشاركة</Button>
						</Show>
						<Show when={ability.can('delete', 'BooksPage')}>
							<DeleteDialog
								isLoading={isLoading}
								action={() => onDelete(doc.id!)}
							/>
						</Show>
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

		if (
			ability.can('update', 'BooksPage') ||
			ability.can('delete', 'BooksPage')
		) {
			baseColumns.push(actionsColumn)
		}

		return baseColumns
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		isLoadingUsers,
		user,
		ability,
		setEditingRow,
		setShareRow,
		onDelete,
		isLoading,
		data
	])

	return {
		booksColumns
	}
}
