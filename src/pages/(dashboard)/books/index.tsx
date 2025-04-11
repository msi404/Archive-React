import { useGetApiDocumentQuery } from '@/shared/api/archiveApi';
import {useBooksTable} from '@/pages/(dashboard)/books/models'
import { DynamicTable } from '@/shared/components'
export default function BooksPage ()
{
	const { data } = useGetApiDocumentQuery({})
	
	const booksTable = useBooksTable( data?.result ?? [])
	return (
			<DynamicTable table={booksTable}/>
	)
 }
 