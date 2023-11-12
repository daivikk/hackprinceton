const axios = require('axios');
import { NextResponse } from "next/server";
import { YoutubeLoader } from "langchain/document_loaders/web/youtube"
import { CharacterTextSplitter } from "langchain/text_splitter";
import { TokenTextSplitter } from "langchain/text_splitter";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { MapReduceDocumentsChain, loadSummarizationChain } from "langchain/chains";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

const articleSearch = async (mainTopic) => {
    const url = "https://www.searchapi.io/api/v1/search";
    const params = {
      "engine": "google",
      "q": mainTopic,
      "api_key": "pjBrkJcRYBUfBj6RGu4C5DB9"
    };

    const response = await axios.get(url, { params });

    const articles = [response.data["organic_results"][0], response.data["organic_results"][1], response.data["organic_results"][2]];

    return articles;
}

// const articleSummaries = async (articles) => {
//   let links = []
//   let summaries = []

//   articles.map((article) => (
//     links.push(article.link)
//   ))

//   const llm = new ChatOpenAI({temperature:0})

//   for(let i = 0; i < links.length; i++){
//     let link = links[i];
//     const loader = new CheerioWebBaseLoader(link);
//     const docs = await loader.load()

//     const splitter = new TokenTextSplitter({
//       chunkSize: 3500,
//       chunkOverlap: 250,
//     });

//     const texts = await splitter.splitDocuments(docs);

//     let chain = loadSummarizationChain(llm, { type: "refine" })
//     const res = await chain.call({
//       input_documents: texts,
//     });

//     console.log(res)

//     summaries.push(res);
//   }

//   console.log(summaries)
//   return summaries; 
// }

 export async function POST(req) {
    const { mainTopic } = await req.json();
  
    const articles = await articleSearch(mainTopic);
    // const summaries = await articleSummaries(articles);
  
    return NextResponse.json(
      { 
        article1: articles[0],
        article2: articles[1],
        article3: articles[2],
        // summary1: summaries[0],
        // summary2: summaries[1],
        // summary3: summaries[2],
    },
      { status: 200 }
    );
  }