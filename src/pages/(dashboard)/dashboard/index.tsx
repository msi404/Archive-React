import { Separator } from "@/shared/components/ui/separator";
import { BooksStats } from '@/pages/(dashboard)/dashboard/widgets';
import { TitlesWidget } from '@/pages/(dashboard)/dashboard/widgets/titles-widget'
import { DestinationWidget } from '@/pages/(dashboard)/dashboard/widgets/destination-widget'
export default function HomePage ()
{
	return (
		<>
			<BooksStats />
			<Separator className="my-4" />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
				<TitlesWidget />
				<DestinationWidget />
			</div>
		</>
	)
 }
 