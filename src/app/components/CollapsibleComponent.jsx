'use client';

import TextComponent from "./TextComponent";
import ImageComponent from "./ImageComponent";
import FAQsComponent from "./FAQsComponent.jsx";
import VideosComponent from "./VideosComponent";
import ArticleComponent from "./ArticleComponent";


const CollapsibleComponent = (props) => {
    const mainTopic = props.mainTopic
    const description = props.description
    const images = props.images
    const videoInfo = props.videoInfo
    const articleInfo = props.articleInfo
    const questions = props.questions

    return (
        <div className='ml-24 mr-24 mb-4 rounded-2xl z-10'>
            <div className="collapse rounded-2xl">
                <input type="checkbox" className="peer" /> 
            <div className="rounded-2xl collapse-title bg-white text-dark-gray border-gray-md border-t-2 border-r-2 border-l-2 border-b-2 peer-checked:border-b-0 peer-checked:rounded-br-none peer-checked:rounded-bl-none">
            {/* Collapsbile Component Title */}
                <div className='flex flex-row items-center justify-center'>
                    <h2 className='font-bold text-2xl'>{mainTopic}</h2>
                    <hr className="h-px bg-gray-md border-0"></hr>
                </div>
            </div>
            <div className="collapse-content bg-white text-dark-gray border-gray-md border-t-0 border-r-2 border-l-2 border-b-2 rounded-2xl peer-checked:rounded-tr-none peer-checked:rounded-tl-none"> 
                <h2 className='font-bold text-2xl'>Overview</h2>
                <hr className="h-px bg-gray-md border-0 mb-4"></hr>
                <p id="descriptionHTML">{description}</p>  

            {images.map((image) => (
                <div key={image.thumbnail}> 
                    <div className='flex flex-row justify-center space-x-20 items-center mb-12'>
                    <div className='h-full w-72 flex flex-row justify-center space-x-20 items-center mb-12'>
                        <a target="_blank" href={image.original.link}>
                            <img src={image.thumbnail} className='object-contain object-scale-down mt-4 m-auto'/>
                        </a>
                    </div>
                    </div>
                </div>
            ))}
            <h2 className='font-bold text-2xl'>Videos</h2>
            <hr className="h-px bg-gray-md border-0"></hr>

            {videoInfo.videos.map((video, index) => (
                <div key={video.link}>
                    <div className='flex flex-row justify-center space-x-20 mb-12'>
                        <div className='flex'>
                            <div className='h-full w-72'>
                                <img src={video.thumbnail.static} className='object-contain object-scale-down mt-4 m-auto'></img>
                                <a href={video.link} className='flex justify-center mt-2 underline decoration-gray-md font-medium hover:font-semibold'>{video.title}</a>
                                <a className='flex justify-center mt-2'>
                                    <button onClick={()=>document.getElementById({index}).showModal()}
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
                </div>
            ))}

            <h2 className='font-bold text-2xl'>Test Your Knowledge</h2>
            <hr className="h-px bg-gray-md border-0"></hr>
            {questions.map((question, index) => (
                <div key={question.question}>
                    <ul className="max-w-full mx-auto mt-4 mb-12 divide-y rounded-xl">
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
                                <p className='answer'>
                                    {question.answer}
                                </p>
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
                        <p className="font-medium hover:font-regular">{article.snippet}</p>
                    </div>
                ))}
            </div> 
            </div>
            </div>
        </div>
    )
}

export default CollapsibleComponent