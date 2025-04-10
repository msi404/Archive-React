import { usePostApiAuthLoginMutation } from '@/shared/api/archiveApi';
import type { PostApiAuthLoginApiArg } from '@/shared/api/archiveApi'
import {toast} from 'sonner'
const initialValues: PostApiAuthLoginApiArg = {
	loginDto: {
		email: '',
		password: ''
	}
}

export const useLogin = () =>
{
	const [ login, { isLoading } ] = usePostApiAuthLoginMutation()
	
	const onSubmit = async ( values: PostApiAuthLoginApiArg ) =>
	{
		try
		{
			await login( values ).unwrap()
			toast.success('تم تسجيل الدخول بنجاح.')
		} catch ( error )
		{
			console.error( error )
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-expect-error
			toast.error(error.data.message)
		}
	}

	return {
		onSubmit,
		initialValues,
		isLoading
	}
}