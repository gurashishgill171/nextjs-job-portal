/** @format */

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { prisma } from "@/lib/prisma";
import { JobFilterSchema, JobFilterValues } from "@/lib/validations";
import { redirect } from "../../node_modules/next/navigation";
import FormSubmitButton from "./FormSubmitButton";

async function filterJobs(formData: FormData) {
	"use server";

	const values = Object.fromEntries(formData.entries());

	const { search, type, location } = JobFilterSchema.parse(values);

	const searchParams = new URLSearchParams({
		...(search && { search: search.trim() }),
		...(type && { type: type }),
		...(location && { location: location }),
	});

	redirect(`/?${searchParams.toString()}`);
}

interface JobFiltersProps {
	defaultValues: JobFilterValues;
}

export default async function JobFilters({ defaultValues }: JobFiltersProps) {
	const distinctLocations = await prisma.Job.findMany({
		where: { approved: true },
		select: { location: true },
		distinct: ["location"],
	});
	return (
		<Card className="h-max py-4 w-full sm:w-[320px]">
			<CardContent>
				<form action={filterJobs}>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="search">Search</Label>
							<Input
								id="search"
								name="search"
								placeholder="Title, company, etc."
								defaultValue={defaultValues.search}
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="type">Type</Label>
							<Select id="type" name="type" defaultValue={defaultValues.type}>
								<SelectTrigger>
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent position="popper">
									<SelectItem value="Full-Time">Full-Time</SelectItem>
									<SelectItem value="Part-Time">Part-Time</SelectItem>
									<SelectItem value="Contract">Contract</SelectItem>
									<SelectItem value="Temporary">Temporary</SelectItem>
									<SelectItem value="Internship">Internship</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="location">Location</Label>
							<Select
								id="location"
								name="location"
								defaultValue={defaultValues.location}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent position="popper">
									{distinctLocations.map(
										(location: { location: string | null }) => {
											return (
												location.location !== null && (
													<SelectItem
														key={location.location}
														value={location.location}
													>
														{location.location}
													</SelectItem>
												)
											);
										}
									)}
								</SelectContent>
							</Select>
						</div>
					</div>
					<FormSubmitButton className="w-full mt-4">
						Filter Jobs
					</FormSubmitButton>
				</form>
			</CardContent>
		</Card>
	);
}
