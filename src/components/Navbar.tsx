/** @format */

import Link from "../../node_modules/next/link";
import { Laptop } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
	return (
		<header>
			<nav className="max-w-5xl m-auto flex items-center justify-between py-4 px-2">
				<Link href={"/"} className="flex items-center gap-2">
					<Laptop size="40" />
					<span className="text-2xl font-bold">DreamJobs</span>
				</Link>
				<Button>
					<Link href={"/jobs/new"}>Post Job</Link>
				</Button>
			</nav>
		</header>
	);
}
