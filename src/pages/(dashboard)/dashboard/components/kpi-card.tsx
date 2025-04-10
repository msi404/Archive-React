import type { ReactElement, FC } from 'react'
import NumberFlow from '@number-flow/react'
import { Dynamic } from '@/shared/components/utils/dynamic'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'

type KpiCardType = {
	title: string
	description: string
	footer?: ReactElement
	content: {
		Icon: ReactElement
		number: number
	}
	className?: string
}

export const KpiCard: FC<KpiCardType> = ({
	title,
	description,
	content,
	footer,
	className
}) => {
	return (
		<Card className={cn('w-96 flex-1 min-w-56', className)}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-row-reverse justify-between">
					<div>
						<Dynamic component={content.Icon} />
					</div>
					<NumberFlow
						className="text-4xl font-bold"
						spinTiming={{ duration: 750, easing: 'ease-out' }}
						value={content.number}
					/>
				</div>
			</CardContent>
			<CardFooter>
				<Dynamic component={footer} />
			</CardFooter>
		</Card>
	)
}
