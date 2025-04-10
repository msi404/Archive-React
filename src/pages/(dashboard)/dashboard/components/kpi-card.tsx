import type { ReactElement, FC } from 'react'
import NumberFlow from '@number-flow/react'
import {Dynamic} from '@/shared/components/utils/dynamic'
import
	{
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/components/ui/card'

type KpiCardType = {
	title: string
	description: string
	footer?: ReactElement
	content: {
		Icon: ReactElement
		number: number
	}
}

export const KpiCard: FC<KpiCardType> = ({title, description, content, footer}) => {
	return (
		<Card className='w-96 flex-1 min-w-56'>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex flex-row-reverse justify-between'>
					<Dynamic component={ content.Icon } />
					<NumberFlow className='text-4xl font-bold' spinTiming={{duration: 750, easing: 'ease-out'}} value={content.number}/>
				</div>
			</CardContent>
			<CardFooter>
				<Dynamic component={footer}/>
			</CardFooter>
		</Card>
	)
}
