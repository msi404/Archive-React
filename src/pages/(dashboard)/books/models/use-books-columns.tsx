import { useMemo } from 'react'
import type { ReturnDocument } from '@/shared/api/archiveApi'
import type { ColumnDef } from '@tanstack/react-table'
import {useDelete} from '@/pages/(dashboard)/books/models/use-delete'
import { TableColumnHeader } from '@/shared/components/table/column-header'
import { Badge } from '@/shared/components/ui/badge'
import { Show } from '@/shared/components/utils/show'
import { Actions } from '@/shared/components/table/actions'

export const useBooksColumns = () =>
{
	const {onDelete, isLoading} = useDelete()
	const booksColumns: ColumnDef<ReturnDocument>[] = useMemo<
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
					pinned: true
				}
			},
			{
				accessorKey: 'bookKind',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="تصنيف الكتاب" />
				),
				accessorFn: (row) => row.bookKind ?? 'لا يوجد',
				meta: {
					label: 'تصنيف الكتاب'
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
							<Badge variant='destructive'>
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
					label: 'نوع الكتاب'
				}
			},
			{
				accessorKey: 'destinationName',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="من / الى" />
				),
				accessorFn: (row) => row.destinationName ?? 'لا يوجد',
				meta: {
					label: 'من / الى'
				}
			},
			{
				accessorKey: 'concernedPerson',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="الشخص المعني" />
				),
				accessorFn: ( row ) => row.concernedPerson ?? 'لا يوجد',
				cell: ({ cell }) => (
					<Badge variant='outline'>
						{String(cell.getValue() ?? 'لا يوجد')}
					</Badge>
			),
				meta: {
					label: 'الشخص المعني'
				}
			},
			{
				accessorKey: 'referencePerson',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="المعرف" />
				),
				accessorFn: (row) => row.referencePerson ?? 'لا يوجد',
				meta: {
					label: 'المعرف'
				}
			},
			{
				accessorKey: 'point',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="الجهة" />
				),
				accessorFn: ( row ) => row.point ?? 'لا يوجد',
				cell: ({ cell }) => (
						<Badge variant='outline'>
							{String(cell.getValue() ?? 'لا يوجد')}
						</Badge>
				),
				meta: {
					label: 'الجهة',
					filterType: 'select',
					options: ["one", 'two']
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
					filterType: 'number'
				}
			},
			{
				accessorKey: 'internalIncoming',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="رقم الوارد الداخلي" />
				),
				accessorFn: (row) => row.internalIncoming ?? 'لا يوجد',
				meta: {
					label: 'رقم الوارد الداخلي'
				}
			},
			{
				accessorKey: 'internalIncomingDate',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="تاريخ الوارد الداخلي" />
				),
				accessorFn: (row) => row.internalIncomingDate ?? 'لا يوجد',
				meta: {
					label: 'تاريخ الوارد الداخلي'
				}
			},
			{
				accessorKey: 'number',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="العدد" />
				),
				accessorFn: (row) => row.number ?? 'لا يوجد',
				meta: {
					label: 'العدد'
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
					filterType: 'date'
				}
			},
			{
				accessorKey: 'created',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="تاريخ الانشاء" />
				),
				accessorFn: (row) => row.created ?? 'لا يوجد',
				meta: {
					label: 'تاريخ الانشاء'
				}
			},
			{
				accessorKey: 'point',
				header: ({ column }) => (
					<TableColumnHeader column={column} title="اضيف بواسطة" />
				),
				accessorFn: ( row ) => row.point ?? 'لا يوجد',
				cell: ({ cell }) => (
					<Badge variant='outline'>
						{String(cell.getValue() ?? 'لا يوجد')}
					</Badge>
			),
				meta: {
					label: 'اضيف بواسطة'
				}
			},
			{
				id: 'actions',
				header: 'الاجرائات',
				cell: ({ row }) => {
					const doc = row.original

					return (
						<Actions action={() => onDelete(doc.id!)} doc={doc} isLoading={isLoading} />
					)
				},
				meta: {
					label: 'الاجرائات'
				}
			}
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	return {
		booksColumns
	}
}
