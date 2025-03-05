"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

export function ComponentWrapper({
	className,
	name,
	children,
	...props
}: React.ComponentPropsWithoutRef<"div"> & { name: string }) {
	return (
		<React.Suspense
			name="ComponentWrapper"
			fallback={<div>Loading...</div>}
		>
			<div
				id={name}
				data-name={name.toLowerCase()}
				className={cn("flex w-full scroll-mt-16 flex-col rounded-lg border", className)}
				{...props}
			>
				<div className="border-b px-4 py-3">
					<div className="text-sm font-medium">{getComponentName(name)}</div>
				</div>
				<div className="flex flex-1 flex-wrap gap-2 p-4">{children}</div>
			</div>
		</React.Suspense>
	);
}

function getComponentName(name: string) {
	return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
