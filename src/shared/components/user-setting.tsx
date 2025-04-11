import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { Button } from '@/shared/components/ui/button'
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/shared/components/ui/avatar'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/shared/components/ui/sheet'

import { logout } from '@/shared/lib/features/authSlice'

export function UserSetting({
	user
}: {
	user: {
		name: string
		email: string
		avatar: string
	}
}) {
	const dispatch = useDispatch()
	const onLogout = () => {
		dispatch(logout())
		toast.success('تم تسجيل خروج بنجاح.')
	}
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					size="lg"
					className="md:h-8 md:p-0 cursor-pointer hover:scale-110"
					variant="link"
				>
					<Avatar className="h-14 w-14 rounded-full border border-blue-900">
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback className="rounded-lg">CN</AvatarFallback>
					</Avatar>
				</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<SheetHeader>
					<SheetTitle>اعدادات المستخدم</SheetTitle>
					<SheetDescription>
						يمكنك اجراء تعديلات في اعدادات المستخدم
					</SheetDescription>
				</SheetHeader>
				<div className="flex flex-col gap-8 justify-center items-center">
					<Avatar className="h-28 w-28 rounded-full border border-blue-900">
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback className="rounded-lg">CN</AvatarFallback>
					</Avatar>
					<div className="flex flex-col items-center justify-center gap-2">
						<h1 className="font-bold text-xl">{user.name}</h1>
						<span className="text-gray-500">{user.email}</span>
					</div>
					<Button
						onClick={onLogout}
						className="flex items-center justify-center gap-2 cursor-pointer"
					>
						<span>تسجيل الخروج</span>
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	)
}
