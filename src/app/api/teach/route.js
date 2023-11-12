import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";

const teachMeAgent = async (mainTopic) => {
    console.log('Main Topic: ' + mainTopic)
    const encoder = new TextEncoder();

    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    const model = new ChatOpenAI({
        streaming: true,
        openAIApiKey: process.env.OPENAI_API_KEY,
        callbacks: [
        {
            async handleLLMNewToken(token) {
            await writer.ready;
            await writer.write(encoder.encode(`${token}`));
            },
            async handleLLMEnd() {
            await writer.ready;
            await writer.close();
            },
        },
        ],
  });

    model.call([new HumanMessage(`Teach me about: ${mainTopic}`)]);

    return stream.readable;
}

export async function POST(req) {
  const { mainTopic } = await req.json();
  console.log(mainTopic)

    const description = teachMeAgent(mainTopic)
    return new Response(await description);
}