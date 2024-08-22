"use client"

import { redirect, usePathname, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/server";
import FlashCardGrid from "@/components/FlashCardGrid";

type Props = {};

interface Message {
	front: string;
	back: string;
}

const Page = (props: Props) => {
	// const pathName = usePathname();
	// // check if the pathName is a collection name
	// const collectionName = pathName.split("/").pop();
	const { collectionName } = useParams();
	const [flashcards, setFlashcards] = useState<any[]>([]);


	useEffect(() => {
		async function getCollection() {
		  try {
			const response = await fetch(`/api/supabase?collectionName=${collectionName}`);
			if (!response.ok) {
			  throw new Error('Failed to fetch');
			}
			const data = await response.json();
			console.log(data.flashcards);
			setFlashcards(data.flashcards);
		  } catch (error) {
			console.error("Error fetching flashcards:", error);
		  }
		}
	
		getCollection();
	  }, [collectionName]);

	return (
		<div>
			<h1 className="text-3xl font-extrabold text-center p-4">{collectionName}</h1>
			<FlashCardGrid data={flashcards} />
		</div>
	);
};

export default Page;
