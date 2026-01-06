import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { blogCategories } from '../assets/assets'
import BlogCard from './BlogCard'
import { motion } from 'framer-motion'

const BlogList = () => {
    const [menu, setMenu] = useState("All")
    const { blogs, input } = useAppContext();

    // FIXED: Separated logic to ensure a clean return and proper sorting
    const filteredBlogs = () => {
        let result = blogs;

        // 1. Search Logic: Fixed the double .includes() error
        if (input !== '') {
            result = result.filter((blog) => 
                blog.title.toLowerCase().includes(input.toLowerCase()) || 
                blog.category.toLowerCase().includes(input.toLowerCase())
            );
        }

        // 2. Category Logic: Filter by the menu selection
        result = result.filter((blog) => menu === "All" ? true : blog.category === menu);

        // 3. RECTIFICATION: Added the required comparison function to .sort()
        // This stops the "#<Object>" error by telling JS how to compare dates
        return [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return (
        <div>
            {/* Category Filter Menu */}
            <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
                {blogCategories.map((item) => (
                    <div key={item} className='relative'>
                        <button 
                            onClick={() => setMenu(item)}
                            className={`cursor-pointer text-gray-500 transition-all ${menu === item ? 'text-white px-4 pt-0.5' : ''}`}
                        >
                            <span className='relative z-10'>{item}</span>
                            {menu === item && ( 
                                <motion.div 
                                    layoutId='underline'
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className='absolute left-0 right-0 top-0 h-7 z-0 bg-blue-500 rounded-full'
                                ></motion.div> 
                            )}
                        </button>
                    </div>
                ))}
            </div> 

            {/* Blogs Display Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'> 
                {filteredBlogs().map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>

            {/* Empty State */}
            {filteredBlogs().length === 0 && (
                <div className="text-center text-gray-400 py-20">
                    No blogs found matching your criteria.
                </div>
            )}
        </div>
    )
}

export default BlogList
