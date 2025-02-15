/** @format */

import { Job } from "@prisma/client";
import JobListItem from "./jobListItem";
import { prisma } from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validations";
import { Prisma } from "@prisma/client";

interface JobResultsProps {
	filterValues: JobFilterValues;
}

export default async function JobResults({
	filterValues: { search, type, location },
}: JobResultsProps) {
	const searchQuery = search
		?.split(" ")
		.filter((word: string) => word.length > 0)
		.join(" & ");

	const searchFilter: Prisma.JobWhereInput = searchQuery
		? {
				OR: [
					{ title: { search: searchQuery } },
					{ companyName: { search: searchQuery } },
					{ type: { search: searchQuery } },
					{ location: { search: searchQuery } },
				],
		  }
		: {};

	const where: Prisma.JobWhereInput = {
		AND: [
			searchFilter,
			type ? { type } : {},
			location ? { location } : {},
			{ approved: true },
		],
	};
	const jobs = await prisma.Job.findMany({
		where,
		orderBy: { createdAt: "desc" },
	});
	return (
		<div className="flex flex-col space-y-4 w-full">
			{jobs.length === 0 && <h1 className="m-auto">No Jobs found...</h1>}
			{jobs.map((job: Job) => {
				return <JobListItem job={job} key={job.id} />;
			})}
		</div>
	);
}
