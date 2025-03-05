import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const typographyVariants = cva("scroll-m-20", {
	variants: {
		variant: {
			h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
			h2: "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
			h3: "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
			h4: "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
			h5: "text-sm lg:text-lg tracking-tight",
			h6: "text-sm lg:text-lg tracking-tight",
			p: "text-sm leading-7",
		},
	},
	defaultVariants: {
		variant: "p",
	},
});

export interface TypographyProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(({ className, variant, ...props }, ref) => {
	const Component = variant || "p";
	return React.createElement(
		Component,
		{
			className: cn(typographyVariants({ variant, className })),
			ref,
			...props,
		},
		props.children,
	);
});
