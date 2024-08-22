// app/api/supabase/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

interface Flashcard {
  front: string;
  back: string;
  user_id: string;
  collection_name: string;
}

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const searchParams = request.nextUrl.searchParams;
  const collectionName = searchParams.get('collectionName');

  if (!collectionName) {
    return NextResponse.json({ error: "Collection name is required" }, { status: 400 });
  }

  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const { data: flashcards, error: flashcardsError } = await supabase
      .from("flashcards")
      .select("*")
      .eq("user_id", userData.user.id)
      .eq("collection_name", collectionName);

    if (flashcardsError) throw flashcardsError;

    return NextResponse.json({ flashcards }, { status: 200 });
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.getUser();
    const user = data?.user;

    // Perform other Supabase operations here, like saving flashcards
    console.log("Starting...");
    const requestData = await request.json();
    console.log("Request: ", requestData.flashcards);
    const { data: savedData, error: saveError } = await supabase
      .from('flashcards')
      .insert(
        requestData.flashcards.map((card: Flashcard) => ({
          ...card,
          user_id: user?.id,
        })),
      );
    console.log("Saved data: ", saveError);

    return new Response(JSON.stringify({ user, savedData }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}