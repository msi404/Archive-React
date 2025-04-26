import { Icon } from '@iconify/react'
import { useGetApiDashboardQuery } from '@/shared/api/archiveApi';
import { KpiCard } from '@/pages/(dashboard)/dashboard/components'

export const BooksStats = () => {
	const { data } = useGetApiDashboardQuery()
	return (
		<div className="flex flex-col gap-4">
			<section className="flex flex-wrap justify-between gap-4">
				<KpiCard
					className="bg-gradient-to-br from-green-50 to-green-300"
					title="الكتب الكلية"
					description="العدد الكلي للكتب"
					content={{
						number: data?.result?.documents || 0,
						Icon: (
							<Icon
								color="darkgreen"
								width={60}
								icon="solar:bookmark-opened-bold-duotone"
							/>
						)
					}}
				/>
				<KpiCard
					className="bg-gradient-to-br from-purple-50 to-purple-300"
					title="المرفقات الكلية"
					description="العدد الكلي للمرفقات"
					content={{
						number: data?.result?.documentAttachments || 0,
						Icon: (
							<Icon
								color="purple"
								width={60}
								icon="solar:folder-favourite-bookmark-bold-duotone"
							/>
						)
					}}
				/>
				<KpiCard
					className="bg-gradient-to-br from-yellow-50 to-yellow-300"
					title="الكتب الصادرة"
					description="العدد الكلي للكتب الصادرة"
					content={{
						number: data?.result?.outgoingDocuments || 0,
						Icon: (
							<Icon
								color="darkorange"
								width={60}
								icon="solar:bookmark-opened-bold-duotone"
							/>
						)
					}}
				/>
				<KpiCard
					className="bg-gradient-to-br from-red-50 to-red-300"
					title="الكتب الواردة"
					description="العدد الكلي للكتب الواردة"
					content={{
						number: data?.result?.incomingDocuments || 0,
						Icon: (
							<Icon
								color="red"
								width={60}
								icon="solar:bookmark-opened-bold-duotone"
							/>
						)
					}}
				/>
			</section>
			<hr />
			<section className="flex flex-wrap justify-between gap-4">
				<KpiCard
					className="border"
					title="المؤرشف هذا اليوم"
					description="العدد الكلي للكتب المؤرشفة هذا اليوم"
					content={{
						number: data?.result?.todayDocuments || 0,
						Icon: (
							<Icon
								color="darkblue"
								width={40}
								icon="solar:archive-bold-duotone"
							/>
						)
					}}
				/>
				<KpiCard
					className="border"
					title="المؤرشف هذا الشهر"
					description="العدد الكلي للكتب المؤرشفة هذا الشهر"
					content={{
						number: data?.result?.monthDocuments || 0,
						Icon: (
							<Icon
								color="darkblue"
								width={40}
								icon="solar:archive-bold-duotone"
							/>
						)
					}}
				/>
				<KpiCard
					className="border"
					title="المؤرشفة هذه السنة"
					description="العدد الكلي للكتب المؤرشفة هذه السنة"
					content={{
						number: data?.result?.yearDocuments || 0,
						Icon: (
							<Icon
								color="darkblue"
								width={40}
								icon="solar:archive-bold-duotone"
							/>
						)
					}}
				/>
				<KpiCard
					className="border"
					title="الكتب المكتملة"
					description="العدد الكلي للكتب المكتملة"
					content={{
						number: data?.result?.finishedDouments || 0,
						Icon: (
							<Icon
								color="darkblue"
								width={40}
								icon="solar:bookmark-opened-bold-duotone"
							/>
						)
					}}
				/>
			</section>
		</div>
	)
}
