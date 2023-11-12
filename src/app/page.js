"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import CollapsibleComponent from './components/CollapsibleComponent';

export default function Home() {

  let allData = []
  const [mainTopic, setMainTopic] = useState("");
  const [description, setDescription] = useState("")
  const [subject, setSubject] = useState("")
  const [videoInfo, setVideoInfo] = useState({videos: [], summaries: []})
  const [images, setImages] = useState([])
  const [articleInfo, setArticleInfo] = useState({articles: [], summaries: []})
  const [questions, setQuestions] = useState([])

  const [mainTopic2, setMainTopic2] = useState("");
  const [description2, setDescription2] = useState("")
  const [subject2, setSubject2] = useState("")
  const [videoInfo2, setVideoInfo2] = useState({videos: [], summaries: []})
  const [images2, setImages2] = useState([])
  const [articleInfo2, setArticleInfo2] = useState({articles: [], summaries: []})
  const [questions2, setQuestions2] = useState([])

  const [mainTopic3, setMainTopic3] = useState("");
  const [description3, setDescription3] = useState("")
  const [subject3, setSubject3] = useState("")
  const [videoInfo3, setVideoInfo3] = useState({videos: [], summaries: []})
  const [images3, setImages3] = useState([])
  const [articleInfo3, setArticleInfo3] = useState({articles: [], summaries: []})
  const [questions3, setQuestions3] = useState([])

  const [data, setData] = useState([])

  let counter = 1;

  const handleChatSubmit = (e) => {
    e.preventDefault();
    handleOutput(e.currentTarget);
  }

  const handleOutput = async (prompt) => {

    document.getElementById('component' + counter).classList.remove('hidden');

    document.getElementById('collapse' + counter).checked = true;

    if(counter > 1){
      document.getElementById('collapse' + (counter - 1)).checked = false;
    }

    const formData = new FormData(prompt);

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
      if (counter ==1) {
        setMainTopic(response.mainTopic);
      }
      else if (counter ==2) {
        setMainTopic2(response.mainTopic);
      }
      else {
        setMainTopic3(response.mainTopic);
      }
      return response.mainTopic;
    });

    const handleOutput2 = async (prompt) => {
      console.log("Running correct handler on click of keyword.")
      console.log(prompt)

      document.getElementById('component' + counter).classList.remove('hidden');
  
      document.getElementById('collapse' + counter).checked = true;
  
      if(counter > 1){
        document.getElementById('collapse' + (counter - 1)).checked = false;
      }
    
      const res = await fetch("api/prompt", {
        method: "POST",
        body: JSON.stringify({
          prompt: prompt,
        }),
        headers: {
          "Content-Type": "application/json",
        },
  
      }).then((response) => response.json())
      .then((response) => {
        if (counter ==1) {
          setMainTopic(response.mainTopic);
        }
        else if (counter ==2) {
          setMainTopic2(response.mainTopic);
        }
        else {
          setMainTopic3(response.mainTopic);
        }
        return response.mainTopic;
      });
    }

    const getSubject = async () => {
      const fetchedMainTopic = await res;

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
        if (counter ==1) {
          setSubject(subject);
        }
        else if (counter ==2) {
          setSubject2(subject);
        }
        else {
          setSubject3(subject);
        }        
        return subject;
  }

    const getDescription = async () => {
      const fetchedMainTopic = await res;
      if (counter ==1) {
        setDescription("");
      }
      else if (counter ==2) {
        setDescription2("");
      }
      else {
        setDescription3("");
      }
      const descriptionStream = await fetch("api/teach", {
        method: "POST",
        body: JSON.stringify({
          mainTopic: fetchedMainTopic,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
  
      const reader2 = descriptionStream.body.getReader();
  
      while (true) {
        const { done, value } = await reader2.read();
  
        if (done) {
          const postDescriptionText = document.getElementById('descriptionHtml' + counter).innerHTML;
          if (counter ==1) {
            setDescription(postDescriptionText);
          }
          else if (counter ==2) {
            setDescription2(postDescriptionText);
          }
          else {
            setDescription3(postDescriptionText);
          }          
          const keywords = await fetch("api/keywords", {
            method: "POST",
            body: JSON.stringify({
              text: postDescriptionText,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const parsedKeywords = await keywords.json();
          let keywordString = parsedKeywords.keywords;
          let keywordArr = keywordString.split('\n');

          for(let i = 0; i < keywordArr.length; i++){
            keywordArr[i] = keywordArr[i].slice(3);
          }

          let rawDescriptionText = postDescriptionText;

          for(let i = 0; i < keywordArr.length; i++){
            let currentKeyword = keywordArr[i];
            let result = rawDescriptionText.toLocaleUpperCase().indexOf(currentKeyword.toLocaleUpperCase());
            if(result >= 0){
              let substring = rawDescriptionText.substring(result, result + currentKeyword.length);
              let pre = rawDescriptionText.substring(0, result);
              let post = rawDescriptionText.substring(result + currentKeyword.length);
              rawDescriptionText = pre + `<a class='keywords' >`+ substring + "</a>" + post;
            }//style={{text-decoration: 'underline !important', display: 'inline !important'}} onHover={style={{color: 'purple !important'}}}
          }

          document.getElementById('descriptionHtml' + counter).innerHTML = rawDescriptionText;

          let anchorTags = document.getElementsByClassName('keywords');
          for(let i = 0; i < anchorTags.length; i++){
            let anchorTag = anchorTags[i];
            // anchorTag.addEventListener ("click", handleOutput2(anchorTag.innerHTML));
            // anchorTag.setAttribute("onclick", `console.log("${anchorTag.innerHTML}");handleOutput("${anchorTag.innerHTML}");`)
          }
          break;
        }
  
        const descriptionText = new TextDecoder().decode(value);
        if (counter ==1) {
          setDescription((prevData) => prevData + descriptionText);
        }
        else if (counter ==2) {
          setDescription2((prevData) => prevData + descriptionText);
        }
        else {
          setDescription3((prevData) => prevData + descriptionText);
        }
      }
    };
    const getVideos = async () => {
      const fetchedMainTopic = await res;

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
        if (counter ==1) {
          setVideoInfo(videoInfo);
        }
        else if (counter ==2) {
          setVideoInfo2(videoInfo);
        }
        else {
          setVideoInfo3(videoInfo);
        }   
        return videoInfo
  }
  const getImages = async () => {
    const fetchedMainTopic = await res;

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
      if (counter ==1) {
        setImages(images);
      }
      else if (counter ==2) {
        setImages2(images);
      }
      else {
        setImages3(images);
      }         
      return images
}
const getArticles = async () => {
  const fetchedMainTopic = await res;

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
    if (counter ==1) {
      setArticleInfo(articleInfo);
    }
    else if (counter ==2) {
      setArticleInfo2(articleInfo);
    }
    else {
      setArticleInfo3(articleInfo);
    }       
    return articleInfo
}

const getQA = async () => {
  const fetchedMainTopic = await res;

  const fetchedSubject = await getSubject()

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
        
        if (counter ==1) {
          setQuestions(questions);
        }
        else if (counter ==2) {
          setQuestions2(questions);
        }
        else {
          setQuestions3(questions);
        }           
        return questions
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
      if (counter ==1) {
        setQuestions(questions);
      }
      else if (counter ==2) {
        setQuestions2(questions);
      }
      else {
        setQuestions3(questions);
      }   

      return questions
  }
  
}
    const mainTopic = await res;
    const subject = await getSubject();
    const description = await getDescription();
    const images = await getImages();
    const videoInfo = await getVideos();
    const questions = await getQA();
    const articleInfo = await getArticles();

    allData.push({
      mainTopic: mainTopic,
      description: description,
      images: images,
      videoInfo: videoInfo,
      questions: questions,
      articleInfo: articleInfo
    })

    // let newData = data;
    // newData.push(dataObject);
    // console.log(newData)
    // setData(newData)
    // console.log(data)
    counter++
  };

  return (
    <>
  {/* <form onSubmit={handleChatSubmit}>
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
      {description}
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
  </div>   */}

  <div className="App">
     <div className="relative w-full max-w-lg">
          <div className="absolute -z-99 opacity-[10%] left-[45rem] top-[10rem] w-[30rem] h-[30rem] bg-blue rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob1"></div>
          <div className="absolute -z-99 opacity-[10%] left-[15rem] top-[10rem] w-[30rem] h-[30rem] bg-purple rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob2 animation-delay-4000"></div>

          <div className="absolute -z-99 opacity-[10%] left-[5rem] top-[10rem] w-[25rem] h-[25rem] bg-blue rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob1"></div>
          <div className="absolute -z-99 opacity-[10%] left-[55rem] top-[10rem] w-[25rem] h-[25rem] bg-purple rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob2 animation-delay-4000"></div>
        </div>
  <div className='relative'> 
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
      <div
          className="relative isolate overflow-hidden bg-gray-50 px-6 py-12 text-center sm:px-16 sm:shadow-sm dark:bg-transparent">
            <p className="relative pt-36 mx-auto max-w-2xl text-4xl font-bold tracking-tight text-dark-gray dark:text-dark-gray sm:text-4xl">
                rediscover <span className='relative font-medium bg-gradient-to-r from-blue via-blue to-purple inline-block text-transparent bg-clip-text'>learning</span>
            </p>
          <form onSubmit={handleChatSubmit}>
              <label
                  className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                  htmlFor="search-bar">
                  <input id="search-bar" placeholder="I want to learn..." name="prompt" className="relative px-6 py-2 w-full rounded-md flex-1 outline-none bg-white" required="" />
                  <button type="submit"
                      className="relative w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all">
                      <div className="relative flex items-center transition-all opacity-1">
                          <span className="relative bg-gradient-to-r from-light-blue via-light-blue to-light-purple inline-block text-transparent bg-clip-text text-sm font-semibold whitespace-nowrap truncate mx-auto ">
                              Learn
                          </span>
                      </div>
                  </button>
              </label>
          </form>
      </div>
    </div>
  </div>


  <div id="component1" className='ml-24 mr-24 mb-4 rounded-2xl z-10 hidden'>
            <div className="collapse rounded-2xl">
                <input id="collapse1" type="checkbox" className="peer" /> 
            <div className="rounded-2xl collapse-title bg-white text-dark-gray border-gray-md border-t-2 border-r-2 border-l-2 border-b-2 peer-checked:border-b-0 peer-checked:rounded-br-none peer-checked:rounded-bl-none">
            {/* Collapsbile Component Title */}
                <div className='flex flex-row items-center justify-center'>
                    {/* <h2 className='font-bold text-2xl'>{mainTopic}</h2> */}
                    <hr className="h-px bg-gray-md border-0"></hr>
                </div>
            </div>
            <div className="collapse-content bg-white text-dark-gray border-gray-md border-t-0 border-r-2 border-l-2 border-b-2 rounded-2xl peer-checked:rounded-tr-none peer-checked:rounded-tl-none"> 
                <h2 className='font-bold text-2xl'>{mainTopic}</h2>
                <hr className="h-px bg-gray-md border-0 mb-4"></hr>
                <pre className="flex font-sans w-9/12 whitespace-pre-line" id="descriptionHtml1">{description}</pre>  

            <div className='flex flex-row justify-center space-x-20 items-center mb-12'>
            {images.map((image) => (
                <div key={image.thumbnail}> 
                      <div className='h-full w-72 flex flex-row justify-center space-x-20 items-center mb-12'>
                        <a target="_blank" href={image.original.link}>
                            <img src={image.thumbnail} className='object-contain object-scale-down mt-4 m-auto'/>
                        </a>
                    </div>
                </div>
            ))}
            </div>
            <h2 className='font-bold text-2xl'>Videos</h2>
            <hr className="h-px bg-gray-md border-0"></hr>

            <div className='flex flex-row justify-center space-x-20 mb-12'>
            {videoInfo.videos.map((video, index) => (
                <div key={video.link}>
                        <div className='flex'>
                            <div className='h-full w-72'>
                                <img src={video.thumbnail.static} className='object-contain object-scale-down mt-4 m-auto'></img>
                                <a target="_blank" href={video.link} className='flex justify-center mt-2 underline decoration-gray-md font-medium hover:font-semibold'>{video.title}</a>
                                <a className='flex justify-center mt-2'>
                                    <button onClick={()=>document.getElementById(index).showModal()}
                                        className="relative w-full md:w-auto px-5 py-2 bg-light-gray-2 border-0 text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all flex">
                                        <div className="relative flex items-center transition-all opacity-1">
                                            <span className="relative bg-dark-gray inline-block text-transparent bg-clip-text text-sm font-semibold whitespace-nowrap truncate mx-auto ">
                                            Video Summary
                                            </span>
                                        </div>
                                    </button>
                                    <dialog id={index} className="modal">
                                        <div className="modal-box bg-white">
                                            <h3 className="font-bold text-lg  decoration-gray-md">{video.title}</h3>
                                            <hr className="h-px bg-gray-md border-0"></hr>

                                            <p className="py-4">{videoInfo.summaries[index].text}</p>
                                        </div>
                                        <form method="dialog" className="modal-backdrop">
                                            <button>close</button>
                                        </form>
                                    </dialog>
                                </a>
                            </div>
                        </div>
                    </div>
            ))}
            </div>

            <h2 className='font-bold text-2xl'>Test Your Knowledge</h2>
            <hr className="h-px bg-gray-md border-0"></hr>
            {questions.map((question, index) => (
                <div key={question.question}>
                    <ul className="max-w-full mx-auto mt-4 mb-8 divide-y rounded-xl">
                    <li>
                        <details className="group">
                            <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                                <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                                    width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                    </path>
                                </svg>
                                <span className='question hover:font-semibold'>{question.question}</span>
                            </summary>

                            <article className="px-4 pb-4">
                                <pre className="flex font-sans w-9/12 whitespace-pre-line answer">
                                    {question.answer}
                                </pre>
                            </article>
                        </details>
                    </li>
                    </ul>
                </div>
            ))}

            <h2 className='font-bold text-2xl'>Articles</h2>
            <hr className="h-px bg-gray-md border-0 mb-4"></hr>
            <div className='flex flex-col space-y-2'>
                {articleInfo.articles.map((article, index) => (
                    <div key={article.link}>
                        <a target="_blank" href={article.link}>
                            <p className='underline decoration-gray-md font-medium hover:font-semibold'>{article.title} | {article.domain}</p>
                        </a>
                        <p className="font-regular italic">{article.snippet}</p>
                    </div>
                ))}
            </div> 
            </div>
            </div>
        </div>


        <div id="component2" className='ml-24 mr-24 mb-4 rounded-2xl z-10 hidden'>
            <div className="collapse rounded-2xl">
                <input id="collapse2" type="checkbox" className="peer" /> 
            <div className="rounded-2xl collapse-title bg-white text-dark-gray border-gray-md border-t-2 border-r-2 border-l-2 border-b-2 peer-checked:border-b-0 peer-checked:rounded-br-none peer-checked:rounded-bl-none">
            {/* Collapsbile Component Title */}
                <div className='flex flex-row items-center justify-center'>
                    {/* <h2 className='font-bold text-2xl'>{mainTopic}</h2> */}
                    <hr className="h-px bg-gray-md border-0"></hr>
                </div>
            </div>
            <div className="collapse-content bg-white text-dark-gray border-gray-md border-t-0 border-r-2 border-l-2 border-b-2 rounded-2xl peer-checked:rounded-tr-none peer-checked:rounded-tl-none"> 
                <h2 className='font-bold text-2xl'>{mainTopic}</h2>
                <hr className="h-px bg-gray-md border-0 mb-4"></hr>
                <pre className="flex font-sans w-9/12 whitespace-pre-line" id="descriptionHtml2">{description}</pre>  

            <div className='flex flex-row justify-center space-x-20 items-center mb-12'>
            {images.map((image) => (
                <div key={image.thumbnail}> 
                      <div className='h-full w-72 flex flex-row justify-center space-x-20 items-center mb-12'>
                        <a target="_blank" href={image.original.link}>
                            <img src={image.thumbnail} className='object-contain object-scale-down mt-4 m-auto'/>
                        </a>
                    </div>
                  </div>
            ))}
            </div>
            <h2 className='font-bold text-2xl'>Videos</h2>
            <hr className="h-px bg-gray-md border-0"></hr>

            <div className='flex flex-row justify-center space-x-20 mb-12'>
            {videoInfo.videos.map((video, index) => (
                <div key={video.link}>
                        <div className='flex'>
                            <div className='h-full w-72'>
                                <img src={video.thumbnail.static} className='object-contain object-scale-down mt-4 m-auto'></img>
                                <a target="_blank" href={video.link} className='flex justify-center mt-2 underline decoration-gray-md font-medium hover:font-semibold'>{video.title}</a>
                                <a className='flex justify-center mt-2'>
                                    <button onClick={()=>document.getElementById(index).showModal()}
                                        className="relative w-full md:w-auto px-5 py-2 bg-light-gray-2 border-0 text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all flex">
                                        <div className="relative flex items-center transition-all opacity-1">
                                            <span className="relative bg-dark-gray inline-block text-transparent bg-clip-text text-sm font-semibold whitespace-nowrap truncate mx-auto ">
                                            Video Summary
                                            </span>
                                        </div>
                                    </button>
                                    <dialog id={index} className="modal">
                                        <div className="modal-box bg-white">
                                            <h3 className="font-bold text-lg  decoration-gray-md">{video.title}</h3>
                                            <hr className="h-px bg-gray-md border-0"></hr>

                                            <p className="py-4">{videoInfo.summaries[index].text}</p>
                                        </div>
                                        <form method="dialog" className="modal-backdrop">
                                            <button>close</button>
                                        </form>
                                    </dialog>
                                </a>
                            </div>
                        </div>
                    </div>
            ))}
            </div>

            <h2 className='font-bold text-2xl'>Test Your Knowledge</h2>
            <hr className="h-px bg-gray-md border-0"></hr>
            {questions.map((question, index) => (
                <div key={question.question}>
                    <ul className="max-w-full mx-auto mt-4 mb-8 divide-y rounded-xl">
                    <li>
                        <details className="group">
                            <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                                <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                                    width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                    </path>
                                </svg>
                                <span className='question hover:font-semibold'>{question.question}</span>
                            </summary>

                            <article className="px-4 pb-4">
                                <pre className="flex font-sans w-9/12 whitespace-pre-line answer">
                                    {question.answer}
                                </pre>
                            </article>
                        </details>
                    </li>
                    </ul>
                </div>
            ))}

            <h2 className='font-bold text-2xl'>Articles</h2>
            <hr className="h-px bg-gray-md border-0 mb-4"></hr>
            <div className='flex flex-col space-y-2'>
                {articleInfo.articles.map((article, index) => (
                    <div key={article.link}>
                        <a target="_blank" href={article.link}>
                            <p className='underline decoration-gray-md font-medium hover:font-semibold'>{article.title} | {article.domain}</p>
                        </a>
                        <p className="font-regular italic">{article.snippet}</p>
                    </div>
                ))}
            </div> 
            </div>
            </div>
        </div>



        <div id="component3" className='ml-24 mr-24 mb-4 rounded-2xl z-10 hidden'>
            <div className="collapse rounded-2xl">
                <input id="collapse3" type="checkbox" className="peer" /> 
            <div className="rounded-2xl collapse-title bg-white text-dark-gray border-gray-md border-t-2 border-r-2 border-l-2 border-b-2 peer-checked:border-b-0 peer-checked:rounded-br-none peer-checked:rounded-bl-none">
            {/* Collapsbile Component Title */}
                <div className='flex flex-row items-center justify-center'>
                    {/* <h2 className='font-bold text-2xl'>{mainTopic}</h2> */}
                    <hr className="h-px bg-gray-md border-0"></hr>
                </div>
            </div>
            <div className="collapse-content bg-white text-dark-gray border-gray-md border-t-0 border-r-2 border-l-2 border-b-2 rounded-2xl peer-checked:rounded-tr-none peer-checked:rounded-tl-none"> 
                <h2 className='font-bold text-2xl'>{mainTopic}</h2>
                <hr className="h-px bg-gray-md border-0 mb-4"></hr>
                <pre className="flex font-sans w-9/12 whitespace-pre-line" id="descriptionHtml3">{description}</pre>  

            <div className='flex flex-row justify-center space-x-20 items-center mb-12'>
            {images.map((image) => (
                <div key={image.thumbnail}> 
                    <div className='h-full w-72 flex flex-row justify-center space-x-20 items-center mb-12'>
                        <a target="_blank" href={image.original.link}>
                            <img src={image.thumbnail} className='object-contain object-scale-down mt-4 m-auto'/>
                        </a>
                    </div>
                </div>  
            ))}
            </div>
            <h2 className='font-bold text-2xl'>Videos</h2>
            <hr className="h-px bg-gray-md border-0"></hr>

            <div className='flex flex-row justify-center space-x-20 mb-12'>
            {videoInfo.videos.map((video, index) => (
                <div key={video.link}>
                        <div className='flex'>
                            <div className='h-full w-72'>
                                <img src={video.thumbnail.static} className='object-contain object-scale-down mt-4 m-auto'></img>
                                <a target="_blank" href={video.link} className='flex justify-center mt-2 underline decoration-gray-md font-medium hover:font-semibold'>{video.title}</a>
                                <a className='flex justify-center mt-2'>
                                    <button onClick={()=>document.getElementById(index).showModal()}
                                        className="relative w-full md:w-auto px-5 py-2 bg-light-gray-2 border-0 text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all flex">
                                        <div className="relative flex items-center transition-all opacity-1">
                                            <span className="relative bg-dark-gray inline-block text-transparent bg-clip-text text-sm font-semibold whitespace-nowrap truncate mx-auto ">
                                            Video Summary
                                            </span>
                                        </div>
                                    </button>
                                    <dialog id={index} className="modal">
                                        <div className="modal-box bg-white">
                                            <h3 className="font-bold text-lg  decoration-gray-md">{video.title}</h3>
                                            <hr className="h-px bg-gray-md border-0"></hr>

                                            <p className="py-4">{videoInfo.summaries[index].text}</p>
                                        </div>
                                        <form method="dialog" className="modal-backdrop">
                                            <button>close</button>
                                        </form>
                                    </dialog>
                                </a>
                            </div>
                        </div>
                    </div>
            ))}
            </div>

            <h2 className='font-bold text-2xl'>Test Your Knowledge</h2>
            <hr className="h-px bg-gray-md border-0"></hr>
            {questions.map((question, index) => (
                <div key={question.question}>
                    <ul className="max-w-full mx-auto mt-4 mb-8 divide-y rounded-xl">
                    <li>
                        <details className="group">
                            <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                                <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                                    width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                    </path>
                                </svg>
                                <span className='question hover:font-semibold'>{question.question}</span>
                            </summary>

                            <article className="px-4 pb-4">
                                <pre className="flex font-sans w-9/12 whitespace-pre-line answer">
                                    {question.answer}
                                </pre>
                            </article>
                        </details>
                    </li>
                    </ul>
                </div>
            ))}

            <h2 className='font-bold text-2xl'>Articles</h2>
            <hr className="h-px bg-gray-md border-0 mb-4"></hr>
            <div className='flex flex-col space-y-2'>
                {articleInfo.articles.map((article, index) => (
                    <div key={article.link}>
                        <a target="_blank" href={article.link}>
                            <p className='underline decoration-gray-md font-medium hover:font-semibold'>{article.title} | {article.domain}</p>
                        </a>
                        <p className="font-regular italic">{article.snippet}</p>
                    </div>
                ))}
            </div> 
            </div>
            </div>
        </div>




  {/* {data.map((dataOjbect, index) => {
    const props = dataOjbect
    return(
        <CollapsibleComponent key={index} {...props} />
    )
    })} */}
<div className=''>
<footer className='flex justify-end mr-2 w-full fixed bottom-0'>
{/* <footer className='flex justify-end mr-2 w-full relative bottom-0'> */}
  <div className=''><span className="text-neutral-400 text-md font-normal">made with </span><span className="text-rose-500 text-md font-normal">❤ </span><span className="text-neutral-400 text-md font-normal">from NJ</span><span className="text-rose-500 text-md font-normal font-['Inter']"> ️</span></div>
</footer>
{/* IF COLLAPSIBLE COMPONENT IS TOGGLED POSITION NEEDS TO CHANGE TO RELATIVE  */}
</div>
</div>
</>

  );
}