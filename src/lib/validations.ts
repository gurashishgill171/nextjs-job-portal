/** @format */

import { z } from "zod";

export const JobFilterSchema = z.object({
	search: z.string().optional(),
	type: z.string().optional(),
	location: z.string().optional(),
});

export type JobFilterValues = z.infer<typeof JobFilterSchema>;
