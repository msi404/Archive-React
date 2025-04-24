import { useDeleteApiDocumentByIdMutation } from '@/shared/api/archiveApiEnhance'

export const useDelete = () =>
{	
	const [ deleteBook, { isLoading } ] = useDeleteApiDocumentByIdMutation()

	const onDelete = async (id: string) =>
	{
		await deleteBook( { id } )
	}

	return {
		onDelete,
		isLoading
	}
}