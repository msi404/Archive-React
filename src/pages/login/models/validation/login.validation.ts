import * as Yup from 'yup'

export const loginValidationSchema = Yup.object({
	loginDto: Yup.object({
		email: Yup.string()
			.required('البريد الالكتروني مطلوب.')
			.email('نمط البريد الالكتروني غير صالح.'),
		password: Yup.string()
			.required('كلمة المرور مطلوبة.')
			.min(6, 'كلمة المرور قصيرة جداً.')
			.max(16, 'كلمة المرور طويلة جداً.')
	})
})
