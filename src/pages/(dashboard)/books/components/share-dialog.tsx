import type { FC } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/shared/components/ui/dialog'
import { Formik, Form, useField } from 'formik'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'

export const ShareDialog: FC<{ open: boolean; onClose: () => void }> = ({
	open,
	onClose,
}) => {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader className="mx-auto">
					<DialogTitle>مشاركة العنصر</DialogTitle>
				</DialogHeader>
				<Formik
					initialValues={{ user: '' }}
					onSubmit={(values) => {
						console.log(values)
						onClose()
					}}
				>
					{() => (
						<Form className="space-y-4">
							<UserInput />
							<Button className="w-full" type="submit">
								مشاركة
							</Button>
						</Form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	)
}

const UserInput: FC = () => {
	const [field] = useField('user')
	return <Input {...field} placeholder="اختر المستخدم" />
}
