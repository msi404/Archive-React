import { FC, useState, useEffect, useCallback } from 'react'
import {
	useGetApiDestinationQuery,
	useDeleteApiDestinationByIdMutation,
	usePostApiDestinationMutation
} from '@/shared/api/archiveApiEnhance'
import {
	InfiniteList,
	ListItem
} from '@/pages/(dashboard)/dashboard/components/infinite-list'
import { toast } from 'sonner'

// Constants
const PAGE_SIZE = 20

// Destination widget that uses the InfiniteList component
export const DestinationWidget: FC = () => {
	// State for managing pagination and destinations
	const [page, setPage] = useState(1)
	const [allDestinations, setAllDestinations] = useState<ListItem[]>([])
	const [searchQuery, setSearchQuery] = useState('')
	const [hasNextPage, setHasNextPage] = useState(true)

	// RTK Query hooks for API calls
	const {
		data: destinationsData,
		isLoading,
		isFetching
	} = useGetApiDestinationQuery({
		pageSize: PAGE_SIZE,
		pageIndex: page,
		// Use search query if available
		...(searchQuery ? { name: searchQuery } : {})
	})

	const [createDestination] = usePostApiDestinationMutation()
	const [deleteDestination] = useDeleteApiDestinationByIdMutation()

	// Process API data and update state
	useEffect(() => {
		if (!destinationsData?.result) return

		// Check if we have more pages
		const totalCount = destinationsData.count || 0
		const hasMore =
			allDestinations.length < totalCount &&
			destinationsData.result.length === PAGE_SIZE
		setHasNextPage(hasMore)

		// Format destinations as ListItems
		const newDestinations = destinationsData.result
			.filter((destination) => destination?.id && destination?.name)
			.map((destination) => ({
				id: destination.id || '',
				name: destination.name || ''
			}))

		// Update allDestinations based on current page
		setAllDestinations((prev) => {
			// If it's the first page, replace all destinations
			if (page === 1) return newDestinations

			// Otherwise append, avoiding duplicates
			const existingIds = new Set(prev.map((d) => d.id))
			const uniqueNewDestinations = newDestinations.filter(
				(destination) => !existingIds.has(destination.id)
			)

			return [...prev, ...uniqueNewDestinations]
		})
	}, [destinationsData, page, allDestinations.length])

	// Add a new destination
	const handleAddDestination = useCallback(
		async (name: string) => {
			try {
				await createDestination({ createDestination: { name } }).unwrap()
				toast.success('Destination added successfully')

				// Reset to first page and clear current destinations
				setPage(1)
				setAllDestinations([])
			} catch (error) {
				toast.error('Failed to add destination')
				console.error('Error adding destination:', error)
				throw error // Propagate error to the component
			}
		},
		[createDestination]
	)

	// Delete a destination
	const handleDeleteDestination = useCallback(
		async (id: string) => {
			try {
				await deleteDestination({ id }).unwrap()
				toast.success('Destination deleted successfully')

				// Remove from local state immediately
				setAllDestinations((prev) =>
					prev.filter((destination) => destination.id !== id)
				)
			} catch (error) {
				toast.error('Failed to delete destination')
				console.error('Error deleting destination:', error)
				throw error
			}
		},
		[deleteDestination]
	)

	// Load more destinations (for infinite scroll)
	const handleLoadMore = useCallback(() => {
		if (isFetching) return
		console.log(`Loading page ${page + 1}`)
		setPage((prev) => prev + 1)
	}, [page, isFetching])

	// Handle search
	const handleSearch = useCallback((query: string) => {
		setSearchQuery(query)
		setPage(1) // Reset to first page
		setAllDestinations([]) // Clear current destinations
	}, [])

	return (
		<InfiniteList
			title="من والى"
			items={allDestinations}
			isLoading={isLoading || (isFetching && page === 1)}
			hasMore={hasNextPage && !isFetching}
			onLoadMore={handleLoadMore}
			onAddItem={handleAddDestination}
			onDeleteItem={handleDeleteDestination}
			onSearch={handleSearch}
			addButtonText="اضافة"
			searchPlaceholder="بحث عن الوجهة"
			emptyMessage="لا يوجد وجهات"
			endMessage="لا يوجد اكثر من الوجهات"
			loadingMessage="جاري تحميل الوجهات"
			className="bg-accent/50 shadow-md rounded-lg border"
		/>
	)
}
