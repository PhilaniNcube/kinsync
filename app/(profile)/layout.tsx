

import type { ReactNode } from "react";

export default function ProfileLayout({children}:{children:ReactNode}) {


	return (
		<div className="w-full bg-white shadow dark:bg-gray-800">
			<div className="container px-4 py-4 mx-auto">
				<div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">


				</div>
				<div className="flex flex-wrap items-center justify-between mt-4">


				</div>

			</div>
      {children}
		</div>
	);
}
