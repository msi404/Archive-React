import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogTrigger
} from '@/shared/components/ui/dialog'
import { usePutApiUserPasswordByIdMutation } from '@/shared/api/archiveApiEnhance'
import { Button } from '@/shared/components/ui/button'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

type ChangePasswordDialogProps = {
	userId: string
}

const validationSchema = Yup.object({
	password: Yup.string()
		.min(6, 'يجب أن تكون كلمة المرور 6 أحرف على الأقل')
		.required('كلمة المرور مطلوبة'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), undefined], 'كلمات المرور غير متطابقة')
		.required('تأكيد كلمة المرور مطلوب')
})

export const ChangePasswordDialog = ({ userId }: ChangePasswordDialogProps) => {
	const [putApiUserPasswordById, { isLoading }] =
		usePutApiUserPasswordByIdMutation()

	const handleSubmit = async (values: { password: string }) => {
		try {
			await putApiUserPasswordById({
				id: userId,
				updatePasswordUser: { newPassword: values.password }
			}).unwrap()
			// Consider adding a success toast notification here
		} catch (error) {
			console.error('Failed to change password:', error)
			// Consider adding an error toast notification here
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">تغيير كلمة المرور</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center">تغيير كلمة المرور</DialogTitle>
				</DialogHeader>
				<Formik
					initialValues={{ password: '', confirmPassword: '' }}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form className="space-y-4">
							<div className='space-y-3'>
								<Label htmlFor="password">كلمة المرور الجديدة</Label>
								<Field
									as={Input}
									type="password"
									id="password"
									name="password"
									placeholder="********"
								/>
								<ErrorMessage
									name="password"
									component="div"
									className="text-red-500 text-sm mt-1"
								/>
							</div>
							<div className='space-y-3'>
								<Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
								<Field
									as={Input}
									type="password"
									id="confirmPassword"
									name="confirmPassword"
									placeholder="********"
								/>
								<ErrorMessage
									name="confirmPassword"
									component="div"
									className="text-red-500 text-sm mt-1"
								/>
							</div>
							<DialogFooter>
								<Button
									type="submit"
									disabled={isLoading || isSubmitting}
									className="w-full"
								>
									{isLoading || isSubmitting ? 'جاري الحفظ...' : 'حفظ'}
								</Button>
							</DialogFooter>
						</Form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	)
}