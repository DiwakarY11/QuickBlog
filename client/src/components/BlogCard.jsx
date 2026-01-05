import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog}) => {
    const navigate = useNavigate(); 
    const {title,description,category,image,_id}=blog;

  return (
    <div 
      onClick={() => navigate(`/blog/${_id}`)} 
      className='cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl'
    >
        <img src={image} alt="" className='aspect-video rounded-t-lg' />
        <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full
        text-primary text-xs'>{category}</span>
        <div className='p-5'>
            <h5 className='mb-2 font-medium text-gray-900'>{title}</h5>
            
            {/* FIXED: Corrected dangerouslySetInnerHTML syntax to render HTML content */}
            <p 
                className='mb-3 text-xs text-gray-600' 
                dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
            ></p>
        </div>
    </div>
  )
}

export default BlogCard