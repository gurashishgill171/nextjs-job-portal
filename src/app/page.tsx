/** @format */
import JobFilters from "@/components/ui/jobFilters";
import JobResults from "@/components/ui/jobResults";
import { JobFilterValues } from "@/lib/validations";

interface PageProps {
	searchParams: {
		search?: string;
		type?: string;
		location?: string;
	};
}

export default async function Home({
	searchParams: { search, type, location },
}: PageProps) {
	const filterValues: JobFilterValues = { search, type, location };
	return (
		<main className="max-w-5xl m-auto px-3 my-10">
			<section className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
				<JobFilters />
				<JobResults filterValues={filterValues} />
			</section>
		</main>
	);
}
