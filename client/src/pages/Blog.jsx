import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Blog = () => {
  const { id } = useParams()
  const { axios } = useAppContext();
  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      if (data.success) {
        setData(data.blog);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const fetchComments = async () => {
    try {
      const { data } = await axios.post('/api/blog/comments', { blogId: id });
      if (data.success) {
        setComments(Array.isArray(data.comments) ? data.comments : []);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/blog/add-comment', {
        blog: id,
        name,
        content
      });

      if (data.success) {
        toast.success(data.message);
        setName('');
        setContent('');
        fetchComments();
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50' />
      <Navbar />

      {/* --- Blog Header Section (From Original Code) --- */}
      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
        </p>
        <h1 className='text-2xl sm:text-5xl font-semibold mx-auto text-gray-900 px-4 max-w-4xl'>
          {data.title}
        </h1>
        <h2 className='my-5 max-w-2xl mx-auto px-4 text-lg'>
          {data.subTitle}
        </h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>
          {data.author || "Admin"}
        </p>
      </div>

      <div className='max-w-5xl md:mx-auto my-10 mt-6 px-5'>
        {/* --- Blog Image and Content --- */}
        <img src={data.image} alt="" className='rounded-3xl mb-10 w-full shadow-lg' />
        
        <div
          className='rich-text max-w-3xl mx-auto text-gray-800 leading-relaxed'
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        <hr className='max-w-3xl mx-auto my-14 border-gray-200' />

        {/* --- Comments Section (Screenshot UI) --- */}
        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-bold text-lg mb-6'>Comments ({comments.length})</p>

          <div className='flex flex-col gap-4'>
            {comments.map((item, index) => (
              <div key={index} className='bg-gray-50/50 border border-gray-100 p-4 rounded-lg relative flex gap-3'>
                {/* User Icon Column */}
                <div className='pt-1'>
                  <img src={assets.user_icon} alt="" className='w-8 h-8 rounded-full border bg-white p-0.5' />
                </div>

                {/* Content Column */}
                <div className='flex-1 pb-4'>
                  <p className='font-semibold text-gray-800 text-sm'>{item.name}</p>
                  <p className='text-gray-600 text-sm mt-1 leading-relaxed'>
                    {item.content}
                  </p>
                </div>

                {/* Relative Time (Bottom Right) */}
                <div className='absolute right-4 bottom-3 text-[10px] text-gray-400'>
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}

            {comments.length === 0 && (
              <p className='text-gray-400 italic text-sm'>No approved comments yet.</p>
            )}
          </div>
        </div>

        {/* --- Add Comment Form (Screenshot UI) --- */}
        <div className='max-w-3xl mx-auto px-5 pb-20 mt-14 pt-10 border-t border-gray-100'>
          <p className='font-bold text-lg mb-6'>Add your comment</p>
          <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder='Name'
              required
              className='w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-600 transition-all'
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder='Comment'
              className='w-full p-3 border border-gray-300 rounded-md outline-none h-32 resize-none focus:border-blue-600 transition-all'
              required
            ></textarea>
            <button
              type="submit"
              className='bg-blue-600 text-white rounded-md py-3 px-10 hover:bg-blue-700 transition-all shadow-md active:scale-95'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  )
}

export default Blog;