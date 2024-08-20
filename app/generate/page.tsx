"use client";

import React from "react";
import axios from "axios";

import FlashCard from "@/components/FlashCard";

type Props = {};

interface Message {
	front: string;
	back: string;
}

const Page = (props: Props) => {
	const [input, setInput] = React.useState("");
	const [message, setMessage] = React.useState<Message[]>([]);
	const [isFrontArray, setIsFrontArray] = React.useState<boolean[]>([]);

	const handleSend = async () => {
		if (input.trim()) {
			setInput("");

			const headers = {
				"Content-Type": "application/json",
			};

			try {
				const res = await axios.post("/api/chat", input, {
					headers: headers,
					timeout: 20000,
					timeoutErrorMessage: "Request timed out",
				});
				// console.log(res?.data?.flashcards);
				setMessage(res?.data?.flashcards);
				setIsFrontArray(new Array(res?.data?.flashcards.length).fill(true)); // Initialize isFrontArray
			} catch (error) {
				console.error("Error querying:", error);
				// setResult("Error querying");
			}
		}
	};

	const handleCardClick = (index: number) => {
		setIsFrontArray((prev) => {
			const newIsFrontArray = [...prev];
			newIsFrontArray[index] = !newIsFrontArray[index];
			return newIsFrontArray;
		});
	};

	return (
		<div className="flex flex-col items-center justify-between min-h-screen gap-12">
			<div className="flex flex-col w-full max-w-md p-4 border border-gray-300 rounded-lg shadow-lg bg-white gap-4 mt-16">
				<input
					type="text"
					className="flex-grow p-2 border border-indigo-300 rounded-lg w-full h-14 *:focus:outline-none"
					placeholder="Enter topic of interest..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && handleSend()}
				/>
				<button
					className="bg-[#00ABE4] text-white p-2 w-full hover:bg-[#0097D3] rounded-lg"
					onClick={handleSend}
				>
					Send
				</button>
			</div>

			<div className="grid grid-cols-3 w-[70%] gap-4">
				{message &&
					message.map((msg, index) => (
						<FlashCard
                        key={index}
                        header={isFrontArray[index] ? "Question" : "Answer"}
                        content={isFrontArray[index] ? msg.front : msg.back}
                        onclick={() => handleCardClick(index)}
                    />
					))}
			</div>
		</div>
	);
};

export default Page;
