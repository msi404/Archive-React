import { usePostApiAuthLoginMutation } from '@/shared/api/archiveApi'
import type { PostApiAuthLoginApiArg } from '@/shared/api/archiveApi'

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
		} catch ( error )
		{
			console.error(error)
		}
	}

	return {
		onSubmit,
		initialValues,
		isLoading
	}
}