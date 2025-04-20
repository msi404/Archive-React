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
import { Separator } from '@/shared/components/ui/separator';

interface EditDialogProps<T> {
	open: boolean
	onClose: () => void
	initialData: T
	onSubmit: ( updated: T ) => void,
	columns: Column<T, unknown>[],
	isLoading?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EditDialog<T extends Record<string, any>>({
	open,
	onClose,
	initialData,
	onSubmit,
	columns,
	isLoading = false
}: EditDialogProps<T>) {
	const editableColumns = columns.filter(
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-expect-error
		(col) => col.columnDef.meta?.editable !== false
	)
	const validationSchema = Yup.object(
		Object.fromEntries(
			editableColumns
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-expect-error
				.filter( ( col ) => col.columnDef.meta?.validation )
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-expect-error
			 .map((col) => [col.id, col.columnDef.meta?.validation])
		)
	 )


	const initialValues = editableColumns.reduce(
		(acc, col) => {
			acc[col.id] = initialData[col.id] ?? ''
			return acc
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		{} as Record<string, any>
	)

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-[425px] md:max-w-[600px] max-h-[100%] overflow-y-auto">
				<DialogHeader className='mx-auto'>
					<DialogTitle>تعديل العنصر</DialogTitle>
				</DialogHeader>
			<Separator />
				<Formik
					  validationSchema={validationSchema}
					initialValues={initialValues}
					onSubmit={(values) => {
						onSubmit({ ...initialData, ...values })
						onClose()
					}}
				>
					<Form className="grid gap-4 py-6">
						<div className="grid md:grid-cols-2 gap-4">
						<For each={editableColumns}>
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
							<Button type="submit" disabled={ isLoading }>
							{isLoading ? '...جارٍ الحفظ' : 'حفظ'}
							</Button>
							<DialogClose asChild>
								<Button variant="outline" type="button">
									إلغاء
								</Button>
							</DialogClose>
						</DialogFooter>
					</Form>
				</Formik>
			</DialogContent>
		</Dialog>
	)
}
