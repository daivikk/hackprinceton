'use client';

// import './App.css';
import CollapsibleComponent from './components/CollapsibleComponent';

function App() {
  return (
  <div className="App">
     <div className="relative w-full max-w-lg">
          {/* <div className="absolute -z-99 opacity-[20%] top-[8rem] left-[12rem] w-[25rem] h-[25rem] bg-blue rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -z-99 opacity-[20%] top-[4rem] left-[52rem] w-[25rem] h-[25rem] bg-purple rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div> */}
          {/* <div className="absolute -z-99 opacity-[15%] left-[45rem] top-[10rem] w-[25rem] h-[25rem] bg-blue rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -z-99 opacity-[15%] left-[15rem] top-[10rem] w-[25rem] h-[25rem] bg-purple rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

          <div className="absolute -z-99 opacity-[15%] left-[5rem] top-[10rem] w-[25rem] h-[25rem] bg-blue rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -z-99 opacity-[15%] left-[55rem] top-[10rem] w-[25rem] h-[25rem] bg-purple rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div> */}
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
          <form action="/search">
              <label
                  className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                  htmlFor="search-bar">
                  <input id="search-bar" placeholder="I want to learn..." name="q" className="relative px-6 py-2 w-full rounded-md flex-1 outline-none bg-white" required="" />
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
<CollapsibleComponent />
<CollapsibleComponent />
<div className=''>
<footer className='flex justify-end mr-2 w-full fixed bottom-0'>
{/* <footer className='flex justify-end mr-2 w-full relative bottom-0'> */}
  <div className=''><span className="text-neutral-400 text-md font-normal font-['Inter']">made with </span><span className="text-rose-500 text-md font-normal font-['Inter']">❤ </span><span className="text-neutral-400 text-md font-normal font-['Inter']">from NJ</span><span className="text-rose-500 text-md font-normal font-['Inter']"> ️</span></div>
</footer>
{/* IF COLLAPSIBLE COMPONENT IS TOGGLED POSITION NEEDS TO CHANGE TO RELATIVE  */}
</div>
</div>
    
  );
}
export default App;
