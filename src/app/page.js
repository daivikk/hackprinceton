"use client";

import { useState } from "react";
import Markdown from "react-markdown";

export default function Home() {

  const [mainTopic, setMainTopic] = useState("");
  const [description, setDescription] = useState("")
  const [subject, setSubject] = useState("")
  const [videoInfo, setVideoInfo] = useState({videos: [], summaries: []})
  const [images, setImages] = useState([])
  const [articleInfo, setArticleInfo] = useState({articles: [], summaries: []})
  const [questions, setQuestions] = useState([])

  const handleChatSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await fetch("api/prompt", {
      method: "POST",
      body: JSON.stringify({
        prompt: formData.get("prompt"),
      }),
      headers: {
        "Content-Type": "application/json",
      },

    }).then((response) => response.json())
    .then((response) => {
      return response.mainTopic;
    });

    const getSubject = async () => {
      const fetchedMainTopic = await res;
      setMainTopic(fetchedMainTopic)

      const res2 = await fetch("api/subject", {
        method: "POST",
        body: JSON.stringify({
          mainTopic: fetchedMainTopic,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        }).then((response) => response.json())
        .then((response) => {
          return response.subject;
        });

        const subject = await res2;
        setSubject(subject)
        return subject;
  }

    const getDescription = async () => {
      const fetchedMainTopic = await res;
      setDescription("")

      const description = await fetch("api/teach", {
        method: "POST",
        body: JSON.stringify({
          mainTopic: fetchedMainTopic,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
  
      const reader2 = description.body.getReader();
  
      while (true) {
        const { done, value } = await reader2.read();
  
        if (done) {
          break;
        }
  
        const descriptionText = new TextDecoder().decode(value);
        setDescription((prevData) => prevData + descriptionText);
      }
    };
    const getVideos = async () => {
      const fetchedMainTopic = await res;
      setMainTopic(fetchedMainTopic)

      const res3 = await fetch("api/videos", {
        method: "POST",
        body: JSON.stringify({
          mainTopic: fetchedMainTopic,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        })

        const parsedResponse = await res3.json();


        const videoInfo = {
          videos: [parsedResponse.video1, parsedResponse.video2, parsedResponse.video3],
          summaries: [parsedResponse.summary1, parsedResponse.summary2, parsedResponse.summary3]
        };
        setVideoInfo(videoInfo)
  }
  const getImages = async () => {
    const fetchedMainTopic = await res;
    setMainTopic(fetchedMainTopic)

    const res4 = await fetch("api/images", {
      method: "POST",
      body: JSON.stringify({
        mainTopic: fetchedMainTopic,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      })

      const parsedResponse = await res4.json();

      const images = [parsedResponse.image1, parsedResponse.image2, parsedResponse.image3]
      setImages(images)
}
const getArticles = async () => {
  const fetchedMainTopic = await res;
  setMainTopic(fetchedMainTopic)

  const res5 = await fetch("api/articles", {
    method: "POST",
    body: JSON.stringify({
      mainTopic: fetchedMainTopic,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    })

    const parsedResponse = await res5.json();

    const articleInfo = {
      articles: [parsedResponse.article1, parsedResponse.article2, parsedResponse.article3],
      // summaries: [parsedResponse.summary1, parsedResponse.summary2, parsedResponse.summary3]
    };
    setArticleInfo(articleInfo)
}


const getQA = async () => {
  const fetchedMainTopic = await res;
  setMainTopic(fetchedMainTopic)

  const fetchedSubject = await getSubject()
  console.log(fetchedSubject)

  if (fetchedSubject === "Math" || fetchedSubject === "math"){
        const res7 = await fetch("api/math", {
        method: "POST",
        body: JSON.stringify({
          mainTopic: fetchedMainTopic,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        })
    
        const parsedResponse = await res7.json();
        const questions = parsedResponse.data;
    
        setQuestions(questions)
  }
  else {
      const res6 = await fetch("api/questions", {
      method: "POST",
      body: JSON.stringify({
        mainTopic: fetchedMainTopic,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      })
  
      const parsedResponse = await res6.json();
      const questions = parsedResponse.data;
  
      setQuestions(questions)
  }
  
}
    getDescription();
    getImages();
    getVideos();
    getArticles();
    getQA();
  };

  return (
    <>
  <form onSubmit={handleChatSubmit}>
    <div className="">
      <input
        className=""
        placeholder="Enter prompt"
        name="prompt"
        required
      ></input>
    </div>

    <div className="">
      <button
        type="submit"
        className=""
      >
        Learn
      </button>
    </div>
  </form>

  <div>
    <h3 className="">Query</h3>
    <div className="flex justify-center">
    <pre className="flex font-sans w-9/12 whitespace-pre-line">
      {mainTopic}
    </pre>
    </div>
  </div>
  <div>
  <h3 className="">Subject</h3>
    <div className="flex justify-center">
    <pre className="flex font-sans w-9/12 whitespace-pre-line">
      {subject}
    </pre>
    </div>
    <h3 className="">AI Response</h3>
    <div className="flex justify-center">
    <pre className="flex font-sans w-9/12 whitespace-pre-line justify-center flex-col">
    {/* <Markdown> */}
      {description}
      {/* </Markdown> */}
    </pre>
    </div>
    <div>
      {videoInfo.videos.map((video, index) => (
        <div key={video.link}>
          <a target="_blank" href={video.link}>
          <img src={video.thumbnail.static}/>
          </a>
          <p>{video.title}</p>
          <p>{videoInfo.summaries[index].text}</p>
        </div>
      ))}
    </div>
    <div>
    {images.map((image) => (
        <div key={image.thumbnail}>
          <a target="_blank" href={image.original.link}>
            <img src={image.thumbnail}/>
          </a>
        </div>
      ))}
    </div>
    <div>
    {articleInfo.articles.map((article, index) => (
        <div key={article.link}>
          <a target="_blank" href={article.link}>
            <p>{article.title} | {article.domain}</p>
          </a>
          <p>{article.snippet}</p>
        </div>
      ))}
    </div>
    <div>
    {questions.map((question, index) => (
        <div key={question.question}>
            <p>{question.question}</p>
          <p>{question.answer}</p>
        </div>
      ))}
    </div>
  </div>
  </>
  )
}
