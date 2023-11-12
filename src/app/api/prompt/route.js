import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { NextResponse } from "next/server";

const runLLMChain = async (prompt) => {
  const model = new ChatOpenAI({
    streaming: false,
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
  });
   
  const res = await model.call([new HumanMessage(prompt)]);
  return res.content
};

export async function POST(req) {
  const { prompt } = await req.json();

  const mainTopic = await runLLMChain(`What is the main topic of this question/statement: ${prompt}. Respond ONLY with a SINGULAR phrase that is most relevant to the quesion/statement given.`);
  console.log(mainTopic)

  return NextResponse.json(
    { mainTopic: mainTopic},
    { status: 200 }
  );
}
