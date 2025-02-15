/** @format */

"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

export default function FormSubmitButton(
	props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
	const { pending } = useFormStatus();

	return (
		<Button {...props} type="submit" disabled={props.disabled || pending}>
			<span className="flex items-center justify-center gap-1">
				{pending && <LoaderCircle className="animate-spin" />}
				{props.children}
			</span>
		</Button>
	);
}
