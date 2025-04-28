import type { Column } from '@tanstack/react-table'
import * as Yup from 'yup'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose
} from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { Formik, Form } from 'formik'
import { ColumnEditField } from '@/shared/components/table/column-edit-field'
import { For } from '@/shared/components/utils/for'
import { Separator } from '@/shared/components/ui/separator'

interface CreateDialogProps<T> {
	open: boolean
	onClose: () => void
	onSubmit: (newData: Partial<T>) => Promise<void> // Use Partial<T> as not all fields might be present
	columns: Column<T, unknown>[]
	isLoading?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CreateDialog<T extends Record<string, any>>({
	open,
	onClose,
	onSubmit,
	columns,
	isLoading = false
}: CreateDialogProps<T>) {
	const creatableColumns = columns.filter(
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-expect-error
		(col) => col.columnDef.meta?.editable !== false // Reuse editable flag for creatable fields
	)

	const validationSchema = Yup.object(
		Object.fromEntries(
			creatableColumns
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-expect-error
				.filter((col) => col.columnDef.meta?.validation)
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-expect-error
				.map((col) => [col.id, col.columnDef.meta?.validation])
		)
	)

	const initialValues = creatableColumns.reduce(
		(acc, col) => {
			// Set default initial value (e.g., empty string)
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error - meta might not exist
			acc[col.id] = col.columnDef.meta?.defaultValue ?? ''
			return acc
		},
		{} as Partial<T> // Use Partial<T>
	)

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-[425px] md:max-w-[600px] max-h-[100%] overflow-y-auto">
				<DialogHeader className="mx-auto">
					<DialogTitle>إنشاء عنصر جديد</DialogTitle>
				</DialogHeader>
				<Separator />
				<Formik
					validationSchema={validationSchema}
					initialValues={initialValues}
					enableReinitialize // Important if initialValues depend on external state
					onSubmit={async (values) => {
						await onSubmit(values)
						onClose()
					}}
				>
					{({ dirty, isValid }) => (
						<Form className="grid gap-4 py-6">
							<div className="grid md:grid-cols-2 gap-4">
								<For each={creatableColumns}>
									{(col) => (
										<ColumnEditField
											key={col.id}
											name={col.id}
											meta={col.columnDef.meta}
										/>
									)}
								</For>
							</div>
							<Separator />
							<DialogFooter>
								<Button
									type="submit"
									disabled={isLoading || !dirty || !isValid}
								>
									{isLoading ? '...جارٍ الإنشاء' : 'إنشاء'}
								</Button>
								<DialogClose asChild>
									<Button variant="outline" type="button">
										إلغاء
									</Button>
								</DialogClose>
							</DialogFooter>
						</Form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	)
}
