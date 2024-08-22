import React from "react";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetFooter
} from "@/components/ui/sheet";

import { AlignJustify } from "lucide-react";
import Link from "next/link";

type Props = {};

const Sidebar = (props: Props) => {
	return (
		<Sheet>
			<SheetTrigger>
                <AlignJustify className="flex focus:ring-0" />
            </SheetTrigger>
			<SheetContent className="w-[300px] sm:w-[350px]" side={"left"}>
				<SheetHeader>
					<SheetTitle className="text-2xl font-bold">BrainDeck</SheetTitle>
					<SheetDescription>
						Navigation Menu
					</SheetDescription>
				</SheetHeader>
				<div className="my-12 flex flex-col gap-2 h-full">
					<Link href={"/"} className="py-4 px-1 rounded-md hover:bg-neutral-200">Home</Link>
					<Link href={"/generate"} className="py-4 px-1 rounded-md hover:bg-neutral-200">Generate</Link>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default Sidebar;
