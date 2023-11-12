'use client';

const TextComponent = (description) => {
    return (
        <>
        <h2 className='font-bold text-2xl'>Overview</h2>
        <hr className="h-px bg-gray-md border-0 mb-4"></hr>
        <p>{description}</p>
        </>
    )
}

export default TextComponent