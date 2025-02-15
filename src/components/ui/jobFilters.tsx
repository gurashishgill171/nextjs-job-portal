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

async function filterJobs(formData: FormData) {
	"use server";
	console.log(formData.get("search") as string);
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
							<Select>
								<SelectTrigger id="type">
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent position="popper">
									<SelectItem value="fulltime">Full-Time</SelectItem>
									<SelectItem value="parttime">Part-Time</SelectItem>
									<SelectItem value="contract">Contract</SelectItem>
									<SelectItem value="temporary">Temporary</SelectItem>
									<SelectItem value="internship">Internship</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="location">Location</Label>
							<Select>
								<SelectTrigger id="location">
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
