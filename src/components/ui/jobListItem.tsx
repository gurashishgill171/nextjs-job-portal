/** @format */

import { Job } from "@prisma/client";
import { Card, CardContent } from "./card";
import { MapPin, Globe, DollarSign, Clock } from "lucide-react";
import { formatDistance } from "date-fns";
import { formatCurrency } from "@/lib/utils";

interface JobListItemProps {
	job: Job;
}

export default function JobListItem({ job }: JobListItemProps) {
	return (
		<Card className="p-[10px]">
			<CardContent className="flex justify-between">
				<div className="flex flex-col gap-[20px]">
					<div>
						<h1 className="font-bold">{job.title}</h1>
						<h4>{job.companyName}</h4>
					</div>
					<div className="flex flex-col gap-[12px]">
						<p className="flex items-center gap-[4px]">
							<MapPin />
							<span>{job.locationType}</span>
						</p>
						{job.location && (
							<p className="flex items-center gap-[4px]">
								<Globe />
								<span>{job.location}</span>
							</p>
						)}
						<p className="flex items-center gap-[4px]">
							<DollarSign />
							<span>{formatCurrency(job.salary)}</span>
						</p>
					</div>
				</div>
				<div className="flex flex-col justify-between">
					<div className="bg-slate-200 p-[6px] rounded-md flex items-center justify-center">
						<span className="text-sm text-slate-800">{job.type}</span>
					</div>
					<p className="flex items-center gap-[4px]">
						<Clock />
						<span>
							{formatDistance(Date.now(), job.createdAt, { addSuffix: false })}
						</span>
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
