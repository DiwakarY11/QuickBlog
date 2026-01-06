import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {
  // Pulling input state and axios from context
  const { setInput, input, axios } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const searchValue = inputRef.current.value;
    if (searchValue.trim() !== "") {
      setInput(searchValue);
    }
  };

  const handleClearSearch = () => {
    setInput("");           // Resets global search state
    inputRef.current.value = ""; // Resets the actual input box
  };

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      
      <div className='text-center mt-20 mb-8'>
        <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} className='w-2.5' alt="star icon" />
        </div>
        
        <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>
          Your own <span className='text-blue-600'>blogging </span> <br /> platform.
        </h1>
      </div>

      <img 
        src={assets.gradientBackground} 
        alt="Background" 
        className='absolute -top-50 -z-1 opacity-50' 
      />

      <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500 text-center'>
        This is your space to think out loud, to share what matters, and to write without filters.
      </p>

      {/* Search Form */}
      <form onSubmit={onSubmitHandler} className='flex justify-center items-center mb-10'>
        <input 
          ref={inputRef}
          type="text" 
          placeholder='Search for blogs' 
          required 
          autoFocus 
          className='py-3 px-4 border border-gray-300 rounded-l-lg outline-none w-full max-w-sm hover:border-gray-400 transition duration-300'
        />
        <button type="submit" className='bg-blue-600 text-white py-3 px-6 rounded-r-lg hover:bg-blue-700 transition-all cursor-pointer'>
            Search
        </button>
      </form>

      {/* Clear Search Button Logic */}
      <div className='text-center'>
        {input && (
          <button 
            onClick={handleClearSearch} 
            className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'
          >
            Clear Search
          </button>
        )}
      </div>
    
    </div>
  )
}

export default Header
