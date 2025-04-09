import type { FC } from 'react'
import {Avatar, AvatarImage, AvatarFallback} from '@/shared/components/ui/avatar'

export const UserSetting: FC = () =>
{
	return (
		<Avatar>
			<AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	)
}