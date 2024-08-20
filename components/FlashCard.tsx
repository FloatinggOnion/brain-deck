import React from "react";

import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";

type Props = {
	header: string;
	content: string;
	onclick: () => void;
};

const FlashCard = (props: Props) => {
	return (
		<Card>
			<CardHeader>{props.header}</CardHeader>
			<CardContent>{props.content}</CardContent>
			<CardFooter>
				<button onClick={props.onclick}>Reveal</button>
			</CardFooter>
		</Card>
	);
};

export default FlashCard;
