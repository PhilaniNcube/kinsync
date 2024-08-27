"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CircleDashed } from "lucide-react";

const SubmitButton = ({
	children,
	className,
}: { children: ReactNode; className?: string }) => {
	const { pending } = useFormStatus();

	return (
		<Button
      type="submit"
			className={cn(
				className,
				pending ? " bg-slate-800" : "",
			)}
		>
			{pending ? <CircleDashed className="animate-spin" /> : children}
		</Button>
	);
};
export default SubmitButton;
