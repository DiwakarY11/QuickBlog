import React from 'react'
import { assets, footer_data } from '../assets/assets'
import { Link } from 'react-router-dom'; 

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg-px-24 xl:px-32 bg-primary/3'>
      <div className='flex flex-col md:flex-row items-start justify-between gap-10
      py-10 border-b border-gray-500/30 text-gray-500'>
        <div>
            {/* The Logo Link is already correct: using <Link to="/"> */}
            <Link to="/">
                <img 
                    src={assets.logo} 
                    alt="logo" 
                    className='w-32 sm:w-44 transition duration-300 hover:scale-105 cursor-pointer' 
                />
            </Link>
            <p className='max-w-[410px] mt-6'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum, repudiandae</p>
        </div>
        <div className='flex flex-wrao justify-between w-full md:w-[45%] gap-5'>
            {footer_data.map((section,index)=>(
              <div key={index}>
                <h3 className='font-semibold text-base text-gray-900 md:mb-5
                mb-2'>{section.title}</h3>
                <ul className='text-sm space-y-1'>
                  {section.links.map((link,i)=>(
                    <li key={i}>
                      {/* 3. CRITICAL CHANGE: Use <Link to={...} /> instead of <a href="#"> */}
                      <Link 
                        // IMPORTANT: You will need to define the actual route for each link.
                        // For now, I'm using a placeholder route, e.g., /about, /contact, etc.
                        to={`/${link.toLowerCase().replace(' ', '-')}`} // Converts "About Us" to "/about-us"
                        className='hover:underline transition'
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
      <p className='py-4 text-center text-sm md:text-base text-gray-500/
      80'>Copyright © 2025 Quickblog All Right Reserved</p>
    </div>
  )
}

export default Footer