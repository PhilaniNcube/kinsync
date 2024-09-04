"use client";

import { Button } from "@/components/ui/button";
import { useDashboardStore } from "./dashboard-provider";
import { Menu, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const MenuToggle = () => {
  const { isOpen, toggle } = useDashboardStore((state) => state);

  if(isOpen) return null;

  return (
    <Button
      variant="outline"
      onClick={toggle}
      className={cn("text-gray-500 focus:outline-none lg:hidden z-[999]")}
    >
      {isOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </Button>
  );
};
export default MenuToggle;
