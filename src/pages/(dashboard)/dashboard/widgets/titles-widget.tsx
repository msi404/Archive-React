import { FC, useState, useEffect, useCallback } from 'react'
import {
	useGetApiTitleQuery,
	usePostApiTitleMutation,
	useDeleteApiTitleByIdMutation
} from '@/shared/api/archiveApiEnhance'
import {
	InfiniteList,
	ListItem
} from '@/pages/(dashboard)/dashboard/components/infinite-list'
import { toast } from 'sonner'

// Constants
const PAGE_SIZE = 20

// Title widget that uses the InfiniteList component
export const TitlesWidget: FC = () => {
	// State for managing pagination and titles
	const [page, setPage] = useState(1)
	const [allTitles, setAllTitles] = useState<ListItem[]>([])
	const [searchQuery, setSearchQuery] = useState('')
	const [hasNextPage, setHasNextPage] = useState(true)

	// RTK Query hooks for API calls
	const {
		data: titlesData,
		isLoading,
		isFetching
	} = useGetApiTitleQuery({
		pageSize: PAGE_SIZE,
		pageIndex: page,
		// Use search query if available
		...(searchQuery ? { name: searchQuery } : {})
	})

	const [createTitle] = usePostApiTitleMutation()
	const [deleteTitle] = useDeleteApiTitleByIdMutation()

	// Process API data and update state
	useEffect(() => {
		if (!titlesData?.result) return

		// Check if we have more pages
		const totalCount = titlesData.count || 0
		const hasMore =
			allTitles.length < totalCount && titlesData.result.length === PAGE_SIZE
		setHasNextPage(hasMore)

		// Format titles as ListItems
		const newTitles = titlesData.result
			.filter((title) => title?.id && title?.name)
			.map((title) => ({
				id: title.id || '',
				name: title.name || ''
			}))

		// Update allTitles based on current page
		setAllTitles((prev) => {
			// If it's the first page, replace all titles
			if (page === 1) return newTitles

			// Otherwise append, avoiding duplicates
			const existingIds = new Set(prev.map((t) => t.id))
			const uniqueNewTitles = newTitles.filter(
				(title) => !existingIds.has(title.id)
			)

			return [...prev, ...uniqueNewTitles]
		})
	}, [titlesData, page, allTitles.length])

	// Add a new title
	const handleAddTitle = useCallback(
		async (name: string) => {
			try {
				await createTitle({ createTitle: { name } }).unwrap()
				toast.success('تم اضافة الموضوع بنجاح')

				// Reset to first page and clear current titles
				setPage(1)
				setAllTitles([])
			} catch (error) {
				toast.error('فشل في اضافة الموضوع')
				console.error('Error adding title:', error)
				throw error // Propagate error to the component
			}
		},
		[createTitle]
	)

	// Delete a title
	const handleDeleteTitle = useCallback(
		async (id: string) => {
			try {
				await deleteTitle({ id }).unwrap()
				toast.success('تم حذف الموضوع بنجاح')

				// Remove from local state immediately
				setAllTitles((prev) => prev.filter((title) => title.id !== id))
			} catch (error) {
				toast.error('فشل في حذف الموضوع')
				console.error('Error deleting title:', error)
				throw error
			}
		},
		[deleteTitle]
	)

	// Load more titles (for infinite scroll)
	const handleLoadMore = useCallback(() => {
		if (isFetching) return
		console.log(`Loading page ${page + 1}`)
		setPage((prev) => prev + 1)
	}, [page, isFetching])

	// Handle search
	const handleSearch = useCallback((query: string) => {
		setSearchQuery(query)
		setPage(1) // Reset to first page
		setAllTitles([]) // Clear current titles
	}, [])

	return (
		<InfiniteList
			title="الموضوع"
			items={allTitles}
			isLoading={isLoading || (isFetching && page === 1)}
			hasMore={hasNextPage && !isFetching}
			onLoadMore={handleLoadMore}
			onAddItem={handleAddTitle}
			onDeleteItem={handleDeleteTitle}
			onSearch={handleSearch}
			addButtonText="اضافة"
			searchPlaceholder="بحث عن موضوع"
			emptyMessage="لا يوجد موضوعات"
			endMessage="لا يوجد اكثر من الموضوعات"
			loadingMessage="جاري تحميل الموضوعات"
			className="bg-accent/50 shadow-md rounded-lg border"
		/>
	)
}
