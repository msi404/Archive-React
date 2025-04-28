import { useDeleteApiUserByIdMutation } from '@/shared/api/archiveApiEnhance'

export const useDelete = () =>
{	
	const [ deleteUser, { isLoading } ] = useDeleteApiUserByIdMutation()

	const onDelete = async (id: string) =>
	{
		await deleteUser( { id } )
	}

	return {
		onDelete,
		isLoading
	}
}