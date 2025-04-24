import { useState, useRef, useEffect, ReactNode } from 'react'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Icon } from '@iconify/react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogTrigger,
	DialogClose
} from '@/shared/components/ui/dialog'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/shared/components/ui/popover'
import { Separator } from '@/shared/components/ui/separator'
import { For } from '@/shared/components/utils/for'
import { Show } from '@/shared/components/utils/show'
import { Switch, Match } from '@/shared/components/utils/switch'

export interface ListItem {
	id: string
	name: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any // Allow for additional properties
}

interface InfiniteListProps<T extends ListItem> {
	items: T[]
	isLoading: boolean
	hasMore: boolean
	onLoadMore: () => void
	onAddItem?: (name: string) => Promise<void>
	onDeleteItem?: (id: string) => Promise<void>
	onSearch?: (query: string) => void
	renderItem?: (item: T) => ReactNode
	title?: string
	addButtonText?: string
	searchPlaceholder?: string
	emptyMessage?: string
	endMessage?: string
	loadingMessage?: string
	className?: string
	searchEnabled?: boolean
	addEnabled?: boolean
	deleteEnabled?: boolean
	deleteConfirmText?: string
}

export function InfiniteList<T extends ListItem>({
	items,
	isLoading,
	hasMore,
	onLoadMore,
	onAddItem,
	onDeleteItem,
	onSearch,
	renderItem,
	title = 'Items',
	addButtonText = 'Add',
	searchPlaceholder = 'Search...',
	emptyMessage = 'No items found',
	endMessage = 'End of list',
	className = 'shadow-md',
	searchEnabled = true,
	addEnabled = true,
	deleteEnabled = true,
	deleteConfirmText = 'هل انت متأكد من حذف هذا العنصر؟'
}: InfiniteListProps<T>) {
	const [searchQuery, setSearchQuery] = useState('')
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [newItemName, setNewItemName] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [openPopoverId, setOpenPopoverId] = useState<string | null>(null)
	const [deletingItemId, setDeletingItemId] = useState<string | null>(null)

	// Ref for the sentinel element (last item)
	const observerTarget = useRef<HTMLDivElement>(null)

	// Handle search input changes
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value
		setSearchQuery(query)
		onSearch?.(query)
	}

	// Handle adding a new item
	const handleAddItem = async () => {
		if (!newItemName.trim() || !onAddItem) return

		setIsSubmitting(true)
		try {
			await onAddItem(newItemName.trim())
			setNewItemName('')
			setIsDialogOpen(false)
		} catch (error) {
			console.error('Failed to add item:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	// Handle delete with confirmation
	const handleDelete = async (id: string) => {
		if (onDeleteItem) {
			setDeletingItemId(id)
			try {
				await onDeleteItem(id)
			} catch (error) {
				console.error('Failed to delete item:', error)
			} finally {
				setDeletingItemId(null)
				setOpenPopoverId(null) // Close popover after deletion
			}
		}
	}

	// Setup Intersection Observer for infinite scrolling
	useEffect(() => {
		if (!hasMore || isLoading) return

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !isLoading) {
					console.log('🔄 Loading more items...')
					onLoadMore()
				}
			},
			{
				rootMargin: '0px 0px 400px 0px', // Start loading when within 400px of the sentinel
				threshold: 0.1
			}
		)

		const currentTarget = observerTarget.current
		if (currentTarget) {
			observer.observe(currentTarget)
		}

		return () => {
			if (currentTarget) {
				observer.unobserve(currentTarget)
			}
		}
	}, [hasMore, isLoading, onLoadMore])

	// Default item renderer if not provided
	const defaultRenderItem = (item: T, index: number) => (
		<div
			key={item.id}
			className={`flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-muted/50 transition-colors ${
				index % 2 === 0 ? '' : 'bg-muted/10'
			}`}
		>
			<span className="truncate">{item.name}</span>
			<Show when={!!(deleteEnabled && onDeleteItem)}>
				<Popover
					open={openPopoverId === item.id}
					onOpenChange={(open) => {
						setOpenPopoverId(open ? item.id : null)
					}}
				>
					<PopoverTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="text-muted-foreground hover:text-destructive"
						>
							<div className="bg-zinc-200 cursor-pointer rounded-full p-3 flex items-center justify-center">
								<Icon icon="solar:trash-bin-2-bold-duotone" />
							</div>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-56" align="end">
						<div className="space-y-3">
							<p className="text-sm font-medium">{deleteConfirmText}</p>
							<div className="flex justify-end gap-2">
								<Button
									size="sm"
									variant="destructive"
									onClick={() => handleDelete(item.id)}
									disabled={deletingItemId === item.id}
								>
									{deletingItemId === item.id ? (
										<>
											يتم الحذف...
										</>
									) : (
										"حذف"
									)}
								</Button>
								<Button
									size="sm"
									variant="outline"
									onClick={() => setOpenPopoverId(null)}
									disabled={deletingItemId === item.id}
								>
									الغاء
								</Button>
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</Show>
		</div>
	)

	return (
		<Card className={className}>
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<CardTitle>{title}</CardTitle>
					<Show when={!!(addEnabled && onAddItem)}>
						<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
							<DialogTrigger asChild>
								<Button size="sm">
									<Icon icon="solar:add-circle-bold" className="mr-1 h-4 w-4" />
									{addButtonText}
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader className="mx-auto">
									<DialogTitle>اضافة عنصر جديد</DialogTitle>
								</DialogHeader>
								<Separator className="my-4" />
								<div className="py-4">
									<Input
										value={newItemName}
										onChange={(e) => setNewItemName(e.target.value)}
										placeholder="ادخل الاسم"
										className="w-full"
										autoFocus
										onKeyDown={(e) => {
											if (e.key === 'Enter' && !e.shiftKey) {
												e.preventDefault()
												handleAddItem()
											}
										}}
									/>
								</div>
								<DialogFooter>
									<Button
										onClick={handleAddItem}
										disabled={isSubmitting || !newItemName.trim()}
									>
										{isSubmitting ? 'يتم الاضافة...' : 'اضافة'}
									</Button>
									<DialogClose asChild>
										<Button
											variant="outline"
											onClick={() => setNewItemName('')}
										>
											الغاء
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</Show>
				</div>

				<Show when={searchEnabled}>
					<div className="pt-2">
						<Input
							placeholder={searchPlaceholder}
							value={searchQuery}
							onChange={handleSearchChange}
							className="w-full"
						/>
					</div>
				</Show>
			</CardHeader>

			<CardContent className="p-0">
				<div className="overflow-auto max-h-[500px]">
					{/* List items */}
					<Switch>
						<Match when={items.length > 0}>
							<div className="py-1">
								<For each={items}>
									{(item, index) => (
										<div key={item.id}>
											{renderItem ? renderItem(item) : defaultRenderItem(item, index)}
										</div>
									)}
								</For>
							</div>
						</Match>
						<Match when={!isLoading}>
							<div className="py-12 text-center text-muted-foreground">
								{emptyMessage}
							</div>
						</Match>
					</Switch>

					{/* Loading indicator */}
					<Show when={isLoading}>
						<div className="p-4 space-y-2">
							<Skeleton className="h-10 w-full" />
							<Skeleton className="h-10 w-full" />
							<Skeleton className="h-10 w-full" />
						</div>
					</Show>

					{/* End of list message */}
					<Show when={!isLoading && items.length > 0 && !hasMore}>
						<div className="py-4 text-center text-sm text-muted-foreground">
							{endMessage}
						</div>
					</Show>

					{/* Sentinel element for intersection observer */}
					<div ref={observerTarget} className="h-4 w-full" aria-hidden="true" />
				</div>
			</CardContent>
		</Card>
	)
}
