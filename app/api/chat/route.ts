import { NextRequest, NextResponse } from "next/server"; // Import NextResponse from Next.js for handling responses

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
	model: "gemini-1.5-flash",
	generationConfig: { responseMimeType: "application/json" },
});

// POST function to handle incoming requests

export async function POST(req: NextRequest) {
	const data = await req.json(); // Parse the JSON body of the incoming request

	// System prompt for the AI, providing guidelines on how to respond to users
	const systemPrompt = `
        You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
        Both front and back should be one sentence long.
        You should return in the following JSON format:
        {
        "flashcards":[
            {
            "front": "Front of the card. This should contain a question",
            "back": "Back of the card. This should contain the answer to the question"
            }
        ]
        }

        ------

        This is the text: ${data}
    `;

	// Create a chat completion request to the Gemini API
	const result = await model.generateContent(systemPrompt);

	return new NextResponse(result?.response?.text()); // Return the stream as the response
}
