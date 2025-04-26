import { useDeleteApiDocumentByDocumentIdRemoveMutation } from '@/shared/api/archiveApiEnhance'

export const useDelete = () =>
{	
	const [ deleteBook, { isLoading } ] = useDeleteApiDocumentByDocumentIdRemoveMutation()

	const onDelete = async (id: string) =>
	{
		await deleteBook( { documentId: id } )
	}

	return {
		onDelete,
		isLoading
	}
}