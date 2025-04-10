import { DynamicTable } from '@/shared/components'
import {useBooksTable} from '@/pages/(dashboard)/books/models'
export default function BooksPage ()
{
	const booksTable = useBooksTable([{d: 'f'}])

	return (
			<DynamicTable table={booksTable}/>
	)
 }
 