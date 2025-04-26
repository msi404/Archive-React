import { useDeleteApiDocumentByDocumentIdRemoveAllMutation } from '@/shared/api/archiveApiEnhance'

export const useDelete = () =>
{	
	const [ deleteBook, { isLoading } ] = useDeleteApiDocumentByDocumentIdRemoveAllMutation()

	const onDelete = async (id: string) =>
	{
		await deleteBook({documentId: id}).unwrap()
	}

	return {
		onDelete,
		isLoading
	}
}