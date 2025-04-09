import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
	loginDto: Yup.object({
		email: Yup.string().required('Email is required').email('Invalid email format'),
		password: Yup.string().required('Password is required').min(6, 'Too short').max(16, 'Too long'),
	})
})