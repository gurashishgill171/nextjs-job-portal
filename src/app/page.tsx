/** @format */
import JobFilters from "@/components/ui/jobFilters";
import JobListItem from "@/components/ui/jobListItem";
import { prisma } from "@/lib/prisma";
import { Job } from "@prisma/client";

export default async function Home() {
	const jobs = await prisma.Job.findMany({
		where: { approved: true },
		orderBy: { createdAt: "desc" },
	});

	return (
		<main className="max-w-5xl m-auto px-3 my-10">
			<section className="flex space-x-4">
				<JobFilters />
				<div className="space-y-4 w-full">
					{jobs.map((job: Job) => {
						return <JobListItem job={job} key={job.id} />;
					})}
				</div>
			</section>
		</main>
	);
}
