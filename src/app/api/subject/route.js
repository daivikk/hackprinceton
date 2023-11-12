import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { NextResponse } from "next/server";

const runLLMChain = async (mainTopic) => {
  const model = new ChatOpenAI({
    streaming: false,
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
  });
   
  const res = await model.call([new HumanMessage(`Given the following subjects (Math, History, Biology, Chemistry, Physics, English), what subject BEST fits this topic: ${mainTopic}. 
  Please answer using ONE WORD that is the SUBJECT from the provided subject list that BEST correlates to the given topic.`)]);
  return res.content
};

export async function POST(req) {
  const { mainTopic } = await req.json();

  const subject = await runLLMChain(mainTopic);
  console.log(subject)

  return NextResponse.json(
    { subject: subject},
    { status: 200 }
  );
}
