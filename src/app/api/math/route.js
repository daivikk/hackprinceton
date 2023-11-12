import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { RunnableSequence } from "langchain/schema/runnable";
import { NextResponse } from "next/server";
import { z } from "zod";

const qaGeneration = async (mainTopic) => {

    const parser = StructuredOutputParser.fromZodSchema(
        z.object({
            questions: z.array(
                z.object(
                    {
                    question: z.string().describe("question generated from given topic"),
                    answer: z.string().describe("step-by-step answer to the question generated"),
                    }
                )
            ).describe("array of questions")
        }));

  const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(`Come up with THREE UNIQUE math problems that utilize this concept: {mainTopic}.\n{format_instructions}. After each question, generate a step-by-step answer to the question. Wrap the resulting array with a singular object.`),
    new ChatOpenAI({ modelName:'gpt-3.5-turbo', temperature: .7 }),
    parser,
  ]);

  const response = await chain.invoke({
            mainTopic: mainTopic,
            format_instructions: parser.getFormatInstructions(JSON),
          });
    
  console.log(response)        
  return response.questions
};

export async function POST(req) {
    const { mainTopic } = await req.json();
  
    const result = await qaGeneration(mainTopic);
  
    return NextResponse.json( {
        data: result
    }
    );
  }