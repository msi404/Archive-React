import type { FC } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { Image } from '@unpic/react'
import { useSelector } from 'react-redux'
import { selectUser } from '@/shared/lib/features/authSlice'
import { defineAbilitiesFor } from '@/shared/config/ability'
import { usePostApiUploadFileFlipMutation } from '@/shared/api/archiveApi'
import { useDeleteApiDocumentImageCartByIdMutation } from '@/shared/api/archiveApi'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/shared/components/ui/tooltip'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/shared/components/ui/popover'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardFooter } from '@/shared/components/ui/card'
import { Switch, Match } from '@/shared/components/utils/switch'
import { Show } from '@/shared/components/utils/show'
import TatweerLogo from '@/assets/tatweer.png'
import { cn } from '@/shared/lib/utils'

export const BookItem: FC<{
	image: string
	id: string
	name: string
}> = ({ image, id, name }) => {
	const [deleteDocument, { isLoading }] =
		useDeleteApiDocumentImageCartByIdMutation({})
	const [filpFile, { isLoading: isLoadingFlip }] =
		usePostApiUploadFileFlipMutation({})
	const [loaded, setLoaded] = useState(false)
	const [hasError, setHasError] = useState(false)

	const [imageVersion, setImageVersion] = useState(Date.now())
	const user = useSelector(selectUser)
	const ability = defineAbilitiesFor(user)

	return (
		<Card className="shadow flex-1">
			<CardContent className="overflow-hidden h-56 w-56 mx-auto">
				<Switch>
					<Match when={loaded && !hasError}>
						<Image
							className={cn(
								'mx-2 transition',
								isLoadingFlip && 'blur-sm opacity-60'
							)}
							src={`${image}?v=${imageVersion}`}
							layout="constrained"
							width={200}
							height={200}
							onLoad={() => setLoaded(true)}
							onError={() => {
								setHasError(true)
								setLoaded(true)
							}}
						/>
					</Match>
					<Match when={hasError && loaded}>
						<Image
							className="mx-2 opacity-50"
							src={TatweerLogo}
							layout="constrained"
							width={200}
							height={200}
							onLoad={() => setLoaded(true)}
							onError={() => {
								setHasError(true)
								setLoaded(true)
							}}
						/>
					</Match>
					<Match when={!loaded && !hasError}>
						<Image
							className="mx-2"
							src={TatweerLogo}
							layout="constrained"
							width={200}
							height={200}
							onLoad={() => setLoaded(true)}
							onError={() => {
								setHasError(true)
								setLoaded(true)
							}}
						/>
					</Match>
				</Switch>
			</CardContent>
			<CardFooter className="text-5xl md:text-3xl flex gap-5 justify-center">
				<Show when={ability.can('create', 'CartPage')}>
					<Popover>
						<PopoverTrigger>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger>
										<div className="md:hover:bg-secondary  bg-secondary md:bg-white p-4 md:p-3 rounded-full cursor-pointer transition-all">
											<Icon icon="solar:archive-check-line-duotone" />
										</div>
									</TooltipTrigger>
									<TooltipContent>
										<p>ارشفة</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</PopoverTrigger>
						<PopoverContent align="center" sideOffset={8}>
							<h1>هل انت متأكد من الارشفة؟</h1>
							<Link to={`/cart/${id}`}>
								<Button
									variant="secondary"
									disabled={isLoadingFlip}
									type="button"
									className="w-full"
								>
									ارشفة
								</Button>
							</Link>
						</PopoverContent>
					</Popover>
				</Show>

				<Show when={ability.can('update', 'CartPage')}>
					<Popover>
						<PopoverTrigger>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger>
										<div className="md:hover:bg-secondary  bg-secondary md:bg-white p-4 md:p-3 rounded-full cursor-pointer transition-all">
											<Icon
												color="blue"
												icon="solar:camera-rotate-line-duotone"
											/>
										</div>
									</TooltipTrigger>
									<TooltipContent>
										<p>تدوير</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</PopoverTrigger>
						<PopoverContent align="center" sideOffset={8}>
							<h1>هل انت متأكد من التدوير؟</h1>
							<Button
								disabled={isLoadingFlip}
								onClick={async () => {
									const res = await filpFile({ flipImage: { name } }).unwrap()
									if (res.statusCode === 200) {
										setImageVersion(Date.now())
									}
								}}
								className="w-full"
							>
								تدوير
							</Button>
						</PopoverContent>
					</Popover>
				</Show>

				<Show when={ability.can('delete', 'CartPage')}>
					<Popover>
						<PopoverTrigger>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger>
										<div className="md:hover:bg-secondary  bg-secondary md:bg-white p-4 md:p-3 rounded-full cursor-pointer transition-all">
											<Icon color="red" icon="solar:trash-bin-2-line-duotone" />
										</div>
									</TooltipTrigger>
									<TooltipContent>
										<p>حذف</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</PopoverTrigger>
						<PopoverContent align="center" sideOffset={8}>
							<h1>هل انت متأكد من الحذف؟</h1>
							<Button
								disabled={isLoading}
								onClick={() => deleteDocument({ id })}
								className="w-full"
								variant="destructive"
							>
								حذف
							</Button>
						</PopoverContent>
					</Popover>
				</Show>
			</CardFooter>
		</Card>
	)
}
