'use client';

import TextComponent from "./TextComponent";
import ImageComponent from "./ImageComponent";
import FAQsComponent from "./FAQsComponent.jsx";
import VideosComponent from "./VideosComponent";
import ArticleComponent from "./ArticleComponent";


const CollapsibleComponent = () => {
    return (
        <div className='ml-24 mr-24 mb-4 rounded-2xl z-10'>
            <div className="collapse rounded-2xl">
                <input type="checkbox" className="peer" /> 
            <div className="rounded-2xl collapse-title bg-white text-dark-gray border-gray-md border-t-2 border-r-2 border-l-2 border-b-2 peer-checked:border-b-0 peer-checked:rounded-br-none peer-checked:rounded-bl-none">
            {/* Collapsbile Component Title */}
                <div className='flex flex-row items-center justify-center'>
                    <h2 className='font-bold text-2xl'>Diagonalization of Matrices</h2>
                    <hr className="h-px bg-gray-md border-0"></hr>
                </div>
            </div>
            <div className="collapse-content bg-white text-dark-gray border-gray-md border-t-0 border-r-2 border-l-2 border-b-2 rounded-2xl peer-checked:rounded-tr-none peer-checked:rounded-tl-none"> 
                <TextComponent />
                <ImageComponent />
                <FAQsComponent />
                <VideosComponent />
                <ArticleComponent />
            </div>
            </div>
        </div>
    )
}

export default CollapsibleComponent