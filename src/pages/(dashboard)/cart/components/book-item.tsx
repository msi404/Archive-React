import type { FC } from 'react';
import {
	Card,
	CardContent,
	CardTitle,
	CardFooter
} from '@/shared/components/ui/card'

export const BookItem: FC<{title: string, image?:string}> = ({title}) =>
{
	return (
		<Card className='shadow'>
		<CardContent>
			<CardTitle>{title}</CardTitle>
		</CardContent>
		<CardFooter>
			<CardTitle>تذبيل العنصر</CardTitle>
		</CardFooter>
	</Card>
	)
}