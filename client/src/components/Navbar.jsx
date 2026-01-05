import React from 'react'; // Removed unused 'use'
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext.jsx';

const Navbar = () => {
    // 1. Extract 'token' along with 'navigate'
    const { navigate, token } = useAppContext(); 

    return (
        <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
            <img 
                onClick={() => navigate('/')}
                src={assets.logo} 
                alt="logo" 
                className='w-32 sm:w-44 cursor-pointer' // Added cursor-pointer for UX
            />
        
            <button 
                onClick={() => navigate('/admin')} 
                className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-blue-500 text-white px-10 py-2.5'
            >
                {/* 2. 'token' is now defined, so this won't crash */}
                {token ? 'Dashboard' : 'Login'}
                
                <img 
                    src={assets.arrow} 
                    className='w-3' 
                    alt="arrow" 
                />
            </button>
        </div>
    );
}

export default Navbar;