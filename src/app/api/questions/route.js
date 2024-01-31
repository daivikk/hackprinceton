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
                    answer: z.string().describe("answer to the question generated, wrap the resulting answer in a String object."),
                    }
                )
            ).describe("array of questions")
        }));

  const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(`Come up with FIVE UNIQUE questions that tests understanding of this subject: {mainTopic}. After each question, generate an understandable answer to the question.\n{format_instructions}. Wrap the resulting array with a singular object.`),
    new ChatOpenAI({ modelName:'gpt-3.5-turbo', temperature: .7 }),
    parser,
  ]);

  const response = await chain.invoke({
            mainTopic: mainTopic,
            format_instructions: parser.getFormatInstructions(JSON),
          });
    
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