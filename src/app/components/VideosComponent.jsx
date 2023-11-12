'use client';

import img from '../images/matrix-diagonalization__84.png'; 
const VideosComponent = () => {
    return (
    <>
        <h2 className='font-bold text-2xl'>Videos</h2>
        <hr className="h-px bg-gray-md border-0"></hr>
        <div className='flex flex-row justify-center space-x-20 mb-12'>
            <div className='flex'>
                <div className='h-full w-72'>
                    <img src={img} className='object-contain object-scale-down mt-4 m-auto'></img>
                    <a href='#' className='flex justify-center mt-2 underline decoration-gray-md font-medium hover:font-semibold'>How to Diagonalize A Matrix</a>
                    <a className='flex justify-center mt-2'>
                        <button onClick={()=>document.getElementById('my_modal_2').showModal()}
                            className="relative w-full md:w-auto px-5 py-2 bg-light-gray-2 border-0 text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all flex">
                            <div className="relative flex items-center transition-all opacity-1">
                                <span className="relative bg-dark-gray inline-block text-transparent bg-clip-text text-sm font-semibold whitespace-nowrap truncate mx-auto ">
                                Summarize Transcription
                                </span>
                            </div>
                        </button>
                        <dialog id="my_modal_2" className="modal">
                            <div className="modal-box bg-white">
                                <h3 className="font-bold text-lg  decoration-gray-md">How To Diagonalize A Matrix</h3>
                                <hr className="h-px bg-gray-md border-0"></hr>

                                <p className="py-4">Summary of transcript.</p>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                  </a>
                </div>
            </div>
        </div>
    </>
    )
}

export default VideosComponent