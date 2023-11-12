const axios = require('axios');
import { NextResponse } from "next/server";
import { YoutubeLoader } from "langchain/document_loaders/web/youtube"
import { CharacterTextSplitter } from "langchain/text_splitter";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { MapReduceDocumentsChain, loadSummarizationChain } from "langchain/chains";

const videoSearch = async (mainTopic) => {
  const url = "https://www.searchapi.io/api/v1/search";
  const params = {
    "engine": "youtube",
    "q": mainTopic,
    "api_key": "uEerThKus1b3ZAQp1a5cAcbn"
  };

    const response = await axios.get(url, { params });

    const videos = [response.data["videos"][0], response.data["videos"][1], response.data["videos"][2]];

    return videos;
}

const videoSummaries = async (videos) => {
  let links = []
  let summaries = []

  videos.map((video) => (
    links.push(video.link)
  ))

  const llm = new ChatOpenAI({temperature:0})

  for(let i = 0; i < links.length; i++){
    let link = links[i];
    const loader = YoutubeLoader.createFromUrl(link, {
      language: "en",
      addVideoInfo: true,
    })
    const docs = await loader.load()

    const splitter = new CharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 50,
    });

    const texts = await splitter.splitDocuments(docs);

    let chain = loadSummarizationChain(llm, { type: "map_reduce" })
    const res = await chain.call({
      input_documents: texts,
    });

    summaries.push(res);
  }
    
  return summaries;
}

 export async function POST(req) {
    const { mainTopic } = await req.json();
  
    const videos = await videoSearch(mainTopic);
    const summaries = await videoSummaries(videos);
  
    return NextResponse.json(
      { 
        video1: videos[0],
        video2: videos[1],
        video3: videos[2],
        summary1: summaries[0],
        summary2: summaries[1],
        summary3: summaries[2],
    },
      { status: 200 }
    );
  }