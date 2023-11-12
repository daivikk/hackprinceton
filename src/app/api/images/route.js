const axios = require('axios');
import { NextResponse } from "next/server";
import { YoutubeLoader } from "langchain/document_loaders/web/youtube"
import { CharacterTextSplitter } from "langchain/text_splitter";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { MapReduceDocumentsChain, loadSummarizationChain } from "langchain/chains";

const imageSearch = async (mainTopic) => {
    const url = "https://www.searchapi.io/api/v1/search";
    const params = {
      "engine": "google_images",
      "q": mainTopic,
      "api_key": "uEerThKus1b3ZAQp1a5cAcbn"
    };

    const response = await axios.get(url, { params });

    const images = [response.data["images"][0], response.data["images"][1], response.data["images"][2]];

    return images;
}

export async function POST(req) {
    const { mainTopic } = await req.json();
  
    const images = await imageSearch(mainTopic);
  
    return NextResponse.json(
      { 
        image1: images[0],
        image2: images[1],
        image3: images[2],
    },
      { status: 200 }
    );
  }