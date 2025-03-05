"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Toast as ToastType, useToast } from "../../context/toast.context";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Button } from "./button";
import { Typography } from "./typography";

const VARIANT_CLASSES = {
	fill: {
		default: "bg-gray-500 border border-gray-600 text-white",
		warning: "bg-yellow-500 border border-yellow-600 text-white",
		info: "bg-sky-500 border border-sky-600 text-white",
		error: "bg-red-500 border border-red-600 text-white",
		success: "bg-green-500 border border-green-600 text-white",
	},
	outline: {
		default: "bg-gray-500/10 border border-gray-600 text-gray-600",
		warning: "bg-yellow-500/10 border border-yellow-600 text-yellow-600",
		info: "bg-sky-500/10 border border-sky-600 text-sky-600",
		error: "bg-red-500/10 border border-red-600 text-red-600",
		success: "bg-green-500/10 border border-green-600 text-green-600",
	},
	border: {
		default: "bg-white border-l-4 border-l-gray-500",
		success: "bg-white border-l-4 border-l-green-500",
		error: "bg-white border-l-4 border-l-red-500",
		info: "bg-white border-l-4 border-l-blue-500",
		warning: "bg-white border-l-4 border-l-yellow-500",
	},
};

// Individual Components
function ToastContainer({
	className,
	children,
	type,
	variant,
}: {
	className?: string;
	children: React.ReactNode;
	type: ToastType["type"];
	variant: ToastType["variant"];
}) {
	return (
		<div
			className={cn(
				"mb-2 flex w-80 max-w-80 items-center justify-between gap-4 rounded-md bg-white px-4 py-2 shadow-lg",
				VARIANT_CLASSES?.[variant]?.[type] ?? VARIANT_CLASSES.border.default,
				className,
			)}
			role="alert"
		>
			{children}
		</div>
	);
}

function ToastContent({ title, message }: { title?: string; message: string }) {
	return (
		<div className="flex-1 -space-y-1">
			{title && <Typography className="font-medium">{title}</Typography>}
			<Typography className="text-sm">{message}</Typography>
		</div>
	);
}

function ToastAction({ onRemove }: { onRemove: () => void }) {
	return (
		<Button
			onClick={onRemove}
			aria-label="Close"
			size="icon"
			variant="ghost"
			className="rounded-full bg-transparent p-1 transition-colors hover:bg-inherit hover:text-inherit"
		>
			<span aria-hidden="true">
				<X />
			</span>
		</Button>
	);
}

// Toast Item Component with Auto-removal
function ToastItem({ index, toast, onRemove }: { index: number; toast: ToastType; onRemove: () => void }) {
	useEffect(() => {
		if (toast.duration) {
			const timer = setTimeout(onRemove, index * toast.duration);
			return () => clearTimeout(timer);
		}
	}, [toast.duration, onRemove]);

	return (
		<ToastContainer
			type={toast.type}
			variant={toast.variant}
		>
			<ToastContent
				title={toast.title}
				message={toast.message}
			/>
			<ToastAction onRemove={onRemove} />
		</ToastContainer>
	);
}

// Main Toast Component
function Toast() {
	const { toasts, removeToast } = useToast();

	return (
		<motion.div
			layoutScroll
			id="toast"
			className="fixed right-4 bottom-4 z-[9999] max-w-md transition-transform"
		>
			<AnimatePresence>
				{toasts.map((toast, index) => (
					<motion.div
						key={toast.id}
						layout
						initial={{ opacity: 0, x: 20, y: 50 }}
						animate={{ opacity: 1, x: 0, y: 0 }}
						exit={{ opacity: 0, x: 20, y: 0 }}
						transition={{ duration: 0.4 }}
						drag
						dragConstraints={{ top: 0, left: -5, right: 5, bottom: 5 }}
						onDragEnd={(_, panInfo) => {
							if (
								panInfo.offset.x < -5 ||
								panInfo.offset.x > 5 ||
								panInfo.offset.y < -5 ||
								panInfo.offset.y > 5
							) {
								removeToast(toast.id);
							}
						}}
						dragElastic={0.5}
						dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
						whileDrag={{ cursor: "grabbing" }}
						className="relative cursor-grab"
					>
						<ToastItem
							index={index + 1}
							toast={toast}
							onRemove={() => removeToast(toast.id)}
						/>
					</motion.div>
				))}
			</AnimatePresence>
		</motion.div>
	);
}

export { Toast, ToastContainer, ToastContent, ToastAction, ToastItem };
