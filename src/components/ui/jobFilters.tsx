/** @format */

import { Button } from "./button";
import { Card, CardContent, CardFooter } from "./card";
import { Input } from "./input";
import { Label } from "./label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./select";
import { prisma } from "@/lib/prisma";
import { JobFilterSchema } from "@/lib/validations";
import { redirect } from "../../../node_modules/next/navigation";

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

export default async function JobFilters() {
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
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="type">Type</Label>
							<Select id="type" name="type">
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
							<Select id="location" name="location">
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
					<Button type="submit" className="w-full mt-4">
						Filter Jobs
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
