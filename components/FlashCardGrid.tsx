"use client";

import FlashCard from "@/components/FlashCard";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

interface Message {
	front: string;
	back: string;
}

type Props = {
	data: any[];
};

const FlashCardGrid = (props: Props) => {
	const [messages, setMessages] = React.useState<Message[]>([]);
	const [isFrontArray, setIsFrontArray] = React.useState<boolean[]>([]);

    useEffect(() => {
        // Initialize isFrontArray to true for each flashcard
        setIsFrontArray(new Array(props.data.length).fill(true));
    }, [props.data]);

	const handleCardClick = (index: number) => {
		setIsFrontArray((prev) => {
			const newIsFrontArray = [...prev];
			newIsFrontArray[index] = !newIsFrontArray[index];
			return newIsFrontArray;
		});
	};

	return (
		<div className="flex flex-col items-center">
            <div className="grid grid-cols-3 w-[70%] gap-4">
                {props.data &&
                    props.data.map((msg, index) => (
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

export default FlashCardGrid;
