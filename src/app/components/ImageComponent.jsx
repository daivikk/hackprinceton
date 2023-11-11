'use client';

import img from '../images/matrix-diagonalization__84.png'; 
// VERY IMPORTANT TO HAVE IMG DEFINED!

const ImageComponent = () => {
    return (
    //   <div className='flex justify-center items-center mb-12'>
    //     <div className='h-full w-72'>
    //         <img src={img} className='object-contain object-scale-down mt-4 m-auto'></img>
    //     </div>
    //   </div>
       <div className='flex flex-row justify-center space-x-20 items-center mb-12'>
       <div className='h-full w-72 flex flex-row justify-center space-x-20 items-center mb-12'>
           <img src={img} className='object-contain object-scale-down mt-4 m-auto'></img>
           <img src={img} className='object-contain object-scale-down mt-4 m-auto'></img>
           <img src={img} className='object-contain object-scale-down mt-4 m-auto'></img>
       </div>
     </div>
    // <>
    //     <h2 className='font-bold text-2xl'>Images</h2>
    //     <hr className="h-px bg-gray-md border-0 mb-2"></hr>
    //     <div className='flex flex-row justify-center space-x-20 mb-12'>
    //         {/* Thumbnail Component */}
    //         <div className='flex'>
    //             <div className='h-full w-72'>
    //                 <img src={img} className='object-contain object-scale-down mt-4 m-auto'></img>
    //             </div>
    //         </div>
    //         {/* Thumbnail Component */}
    //         <div className='flex'>
    //             <div className='h-full w-72'>
    //                 <img src={img} className='object-contain object-scale-down mt-4 m-auto'></img>
    //             </div>
    //         </div>
    //         {/* Thumbnail Component */}
    //         <div className='flex'>
    //             <div className='h-full w-72'>
    //                 <img src={img} className='object-contain object-scale-down mt-4 m-auto'></img>
    //             </div>
    //         </div>
    //     </div>
    // </>
    )
}

export default ImageComponent