"use client";

import Link from "next/link";

export function Navigation() {
	return (
		<nav className="flex items-center gap-4 text-sm">
			<Link
				className=""
				href="/components-sample"
			>
				ShadcnUI Components
			</Link>
		</nav>
	);
}
