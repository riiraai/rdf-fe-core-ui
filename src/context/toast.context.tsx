"use client";

import { createContext, useContext, useState } from "react";

export type ToastType = "default" | "success" | "error" | "info" | "warning";

export type ToastVariant = "fill" | "outline" | "border";

export interface Toast {
	id?: string | number;
	title?: string;
	message: string;
	type?: ToastType;
	duration?: number;
	variant?: ToastVariant;
}

type AddToastParams = Omit<Toast, "id">;

interface ToastContextValue {
	toasts: Toast[];
	addToast: (toast: AddToastParams) => void;
	removeToast: (id: string | number) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast = ({ title, message, type, duration = 2000, variant }: AddToastParams) => {
		const id = Date.now();
		setToasts((prev) => [...prev, { id, title, message, type, duration, variant }]);
	};

	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	};

	return <ToastContext.Provider value={{ toasts, addToast, removeToast }}>{children}</ToastContext.Provider>;
}

export function useToast(): ToastContextValue {
	const context = useContext(ToastContext);
	if (context === undefined) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
}
