import type { ReturnUser, ReturnRole } from '@/shared/api/archiveApi'
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
import { usePutApiUserActiveByIdMutation } from '@/shared/api/archiveApiEnhance'
import { useGetApiUserRolesQuery } from '@/shared/api/archiveApi'
import { useDelete } from '@/pages/(dashboard)/users/models'
import { TableColumnHeader } from '@/shared/components/table/column-header'
import { Show } from '@/shared/components/utils/show'
import { DeleteDialog } from '@/shared/components/table/delete-dialog'
import { Button } from '@/shared/components/ui/button'
import { ChangePasswordDialog } from '@/pages/(dashboard)/users/components/change-passord-dialog'
import { toast } from 'sonner'

export const useUsersColumns = (setEditingRow: (row: ReturnUser) => void) => {
	const { data: rolesData, isLoading: isLoadingRoles } = useGetApiUserRolesQuery()
	const { onDelete, isLoading: isDeleting } = useDelete()
	const user = useSelector(selectUser)
	const ability = defineAbilitiesFor(user)
	const [toggleUserActive, { isLoading: isTogglingActive }] = usePutApiUserActiveByIdMutation()

	const handleToggleActive = async (userId: string, currentStatus: boolean | undefined) => {
		try {
			await toggleUserActive({ id: userId }).unwrap()
			toast.success(currentStatus ? 'تم إلغاء تفعيل المستخدم' : 'تم تفعيل المستخدم')
		} catch (error) {
			console.error('Failed to toggle user active status:', error)
			toast.error('فشل تغيير حالة المستخدم')
		}
	}

	const roleOptions = useMemo(() => {
		if (isLoadingRoles || !Array.isArray(rolesData?.result)) return []
		return rolesData
			.result
			.map((role: ReturnRole) => ({
				label: role.ar_name ?? role.name ?? '',
				value: role.name ?? ''
			}))
			.filter((option) => option.value !== '')
	}, [rolesData, isLoadingRoles])

	const usersColumns: ColumnDef<ReturnUser>[] = useMemo<ColumnDef<ReturnUser>[]>(() => {
		const baseColumns: ColumnDef<ReturnUser>[] = [
			{
				accessorKey: 'name',
				header: ({ column }: HeaderContext<ReturnUser, unknown>) => (
					<TableColumnHeader column={column} title="الاسم" />
				),
				accessorFn: (row: ReturnUser) => row.name ?? 'لا يوجد',
				meta: {
					label: 'الاسم',
					pinned: true,
					validation: Yup.string().required('هذا الحقل مطلوب')
				}
			},
			{
				accessorKey: 'email',
				header: ({ column }: HeaderContext<ReturnUser, unknown>) => (
					<TableColumnHeader column={column} title="البريد الالكتروني" />
				),
				accessorFn: (row: ReturnUser) => row.email ?? 'لا يوجد',
				meta: {
					label: 'البريد الالكتروني',
					validation: Yup.string().required('هذا الحقل مطلوب')
				}
			},
			{
				accessorKey: 'phoneNumber',
				header: ({ column }: HeaderContext<ReturnUser, unknown>) => (
					<TableColumnHeader column={column} title="رقم الهاتف" />
				),
				accessorFn: (row: ReturnUser) => row.phoneNumber ?? 'لا يوجد',
				meta: {
					label: 'رقم الهاتف',
					validation: Yup.string().required( 'هذا الحقل مطلوب' ),
					filterable: false,
					pinnable: false,
				}
			},
			{
				accessorKey: 'password',
				header: () => null,
				cell: () => null,
				meta: {
					label: 'كلمة المرور',
					validation: Yup.string()
						.min(6, 'يجب أن تكون كلمة المرور 6 أحرف على الأقل')
						.required('كلمة المرور مطلوبة'),
					editable: false,
					filterable: false,
					pinnable: false,
					type: 'password',
					creatable: true
				}
			},
			{
				accessorKey: 'roleName',
				header: ({ column }: HeaderContext<ReturnUser, unknown>) => (
					<TableColumnHeader column={column} title="الصلاحيات" />
				),
				accessorFn: (row: ReturnUser) => row.role?.ar_name ?? 'لا يوجد',
				filterFn: (row, value) => {
					if (value === '') return true
					return row.original.role?.name === value
				},
				meta: {
					label: 'الصلاحيات',
					filterType: 'select',
					type: 'select',
					options: roleOptions,
					validation: Yup.string().required('هذا الحقل مطلوب')
				}
			}
		]

		const actionsColumn: ColumnDef<ReturnUser> = {
			id: 'actions',
			header: 'الاجرائات',
			cell: ({ row }: CellContext<ReturnUser, unknown>) => {
				const doc = row.original

				return (
					<div className="flex justify-between gap-3">
						<Show when={ability.can('update', 'UsersPage')}>
							<Button variant="secondary" onClick={() => setEditingRow(doc)}>
								تعديل
							</Button>
						</Show>
						<Show when={ability.can('update', 'UsersPage')}>
							<Button
								variant={doc.isActive ? 'ghost' : 'default'}
								onClick={() => handleToggleActive(doc.id!, doc.isActive)}
								disabled={isTogglingActive}
							>
								{isTogglingActive
									? '...' 
									: doc.isActive
										? 'إلغاء التفعيل'
										: 'تفعيل'} 
							</Button>
						</Show>
						<Show when={ability.can('update', 'UsersPage')}>
							<ChangePasswordDialog userId={doc.id!} />
						</Show>
						<Show when={ability.can('delete', 'UsersPage')}>
							<DeleteDialog
								isLoading={isDeleting}
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
				editable: false,
				creatable: false
			}
		}

		if (
			ability.can('update', 'UsersPage') ||
			ability.can('delete', 'UsersPage')
		) {
			baseColumns.push(actionsColumn)
		}

		return baseColumns
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, setEditingRow, isDeleting, roleOptions, ability, isLoadingRoles, isTogglingActive])

	return {
		usersColumns,
		isLoading: isLoadingRoles
	}
}
