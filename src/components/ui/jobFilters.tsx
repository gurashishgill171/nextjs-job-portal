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

export default function JobFilters() {
	return (
		<Card className="h-max py-4 w-[320px]">
			<CardContent>
				<form>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="search">Search</Label>
							<Input id="search" placeholder="Title, company, etc." />
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
									<SelectItem value="fulltime">Full-Time</SelectItem>
									<SelectItem value="parttime">Part-Time</SelectItem>
									<SelectItem value="contract">Contract</SelectItem>
									<SelectItem value="temporary">Temporary</SelectItem>
									<SelectItem value="internship">Internship</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter>
				<Button className="w-full">Filter Jobs</Button>
			</CardFooter>
		</Card>
	);
}
