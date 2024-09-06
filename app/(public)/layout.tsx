import { getCurrentUser } from "@/utils/data/users";
import { MountainIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const PublicLayout = ({children}:{children:ReactNode}) => {

  return (
    <div>
      <header className="flex items-center px-4 lg:px-6 h-14">
        <Link
          href="/"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <MountainIcon className="size-6" />
          <span className="sr-only">Kinsync</span>
        </Link>
        <nav className="flex gap-4 ml-auto sm:gap-6">
          <Link
            href="/features"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
          <Link
            href="/sign-in"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Sign In
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
};
export default PublicLayout;
