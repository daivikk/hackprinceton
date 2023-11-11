'use client';

// import img from '../images/matrix-diagonalization__84.png'; 
import img from '../images/matrix-diagonalization__84.png'; 

const FAQsComponent = () => {
    const FAQ = () => {
        
    }
    
    return (
<>
    <h2 className='font-bold text-2xl'>FAQs</h2>
    <hr className="h-px bg-gray-md border-0"></hr>
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
                <span className='question hover:font-semibold'>How do I find the eigenvector of a matrix?</span>
            </summary>

            <article className="px-4 pb-4">
                <p className='answer'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ipsum sapien. Vestibulum molestie
                    porttitor augue vitae vulputate. Aliquam nec ex maximus, suscipit diam vel, tristique tellus.
                </p>
                <div className='flex justify-center items-center'>
                    <div className='h-full w-72'>
                    <img src={img} className='object-contain object-scale-down mt-4 m-auto'></img>
                    </div>
                </div>
            </article>
        </details>
    </li>
    </ul>
</>
    )
}

export default FAQsComponent