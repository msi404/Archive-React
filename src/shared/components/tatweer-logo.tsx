import { type FC } from 'react'
import { cn } from '@/shared/lib/utils'
import TatweerLogoImage from '@/assets/tatweer.png'

export const TatweerLogo: FC<{
	className?: string
	width?: number
	height?: number
}> = ({ className, width = 140, height = 140 }) => {
	return (
		<img
			className={ cn( className, 'p-4' ) }
			src={TatweerLogoImage}
			width={width}
			height={height}
			alt="The company logo"
		/>
	)
}
