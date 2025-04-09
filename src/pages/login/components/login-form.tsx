import { Formik, Form } from 'formik'
import { cn } from '@/shared/lib/utils'
import { loginValidationSchema } from '@/pages/login/models/validation'
import { useLogin } from '@/pages/login/models'
import { Button } from '@/shared/components/ui/button'
import { TextField } from '@/shared/components'

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'form'>) {
	const { onSubmit, initialValues, isLoading } = useLogin()
	return (
		<Formik
			validationSchema={loginValidationSchema}
			initialValues={initialValues}
			onSubmit={onSubmit}
		>
			<Form className={cn('flex flex-col gap-6', className)} {...props}>
				<div className="flex flex-col items-center gap-2 text-center">
					<h1 className="text-2xl font-bold">تسجيل الدخول الى الحساب</h1>
					<p className="text-balance text-sm text-muted-foreground">
						ادخل اسم المستخدم وكلمة المرور لتسجيل الدخول
					</p>
				</div>
				<div className="grid gap-6">
					<div className="grid gap-2">
						<TextField
							disabled={isLoading}
							placeholder="email@example.com"
							name="loginDto.email"
							label="اسم المستخدم"
						/>
					</div>
					<div className="grid gap-2">
						<TextField
							disabled={isLoading}
							placeholder="******"
							type="password"
							name="loginDto.password"
							label="كلمة المرور"
						/>
					</div>
					<Button disabled={isLoading} type="submit" className="w-full">
						الدخول
					</Button>
				</div>
			</Form>
		</Formik>
	)
}
