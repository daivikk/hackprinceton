import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { text } = await req.json();

    const model = new ChatOpenAI({
        streaming: false,
        openAIApiKey: process.env.OPENAI_API_KEY,
        temperature: 0,
    });
       
    const res = await model.call([new HumanMessage(`Identify the key 5-10 MOST important key words from: ${text}`)]);
    return NextResponse.json(
        { keywords: res.content},
        { status: 200 }
      );
}