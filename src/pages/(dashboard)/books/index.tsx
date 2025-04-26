import { motion } from 'motion/react'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/shared/components/ui/tabs'
import {
	AllBooksWidgets,
	OutgoingBooksWidgets,
	IncomingBooksWidgets
} from '@/pages/(dashboard)/books/widgets'

export default function BooksPage() {
	return (
		<Tabs dir="rtl" defaultValue="all">
			<TabsList className="flex justify-center w-full">
				<TabsTrigger value="all">الكل</TabsTrigger>
				<TabsTrigger value="incoming">الوارد</TabsTrigger>
				<TabsTrigger value="outgoing">الصادر</TabsTrigger>
			</TabsList>
			<TabsContent value="all">
				<motion.div
					initial={{ x: -300 }}
					animate={{ x: 0, transition: { damping: 0, ease: 'easeOut' } }}
				>
					<AllBooksWidgets />
				</motion.div>
			</TabsContent>
			<TabsContent value="incoming">
				<motion.div
					initial={{ x: -300 }}
					animate={{ x: 0, transition: { damping: 0, ease: 'easeOut' } }}
				>
					<IncomingBooksWidgets />
				</motion.div>
			</TabsContent>
			<TabsContent value="outgoing">
				<motion.div
					initial={{ x: -300 }}
					animate={{ x: 0, transition: { damping: 0, ease: 'easeOut' } }}
				>
					<OutgoingBooksWidgets />
				</motion.div>
			</TabsContent>
		</Tabs>
	)
}
