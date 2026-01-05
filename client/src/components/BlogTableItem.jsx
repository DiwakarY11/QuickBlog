import React from 'react'
import { assets } from '../assets/assets';
import { useAppContext } from '../context/appContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
    const { title, createdAt } = blog;
    const BlogDate = new Date(createdAt);
    const { axios } = useAppContext();

    // Logic from your screenshot: Delete Blog
    const deleteBlog = async () => {
        const confirm = window.confirm('Are you sure you want to delete this blog?');
        if (!confirm) return;
        try {
            // Ensure this matches: blogRouter.post('/delete', auth, deleteBlogById)
            const { data } = await axios.post('/api/blog/delete', { id: blog._id });
            if (data.success) {
                toast.success(data.message);
                fetchBlogs(); // Refresh the list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Toggle Publish Status
    const togglePublish = async () => {
        try {
            // Ensure this matches: blogRouter.post('/toggle-publish', auth, togglePublish)
            const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id });
            if (data.success) {
                toast.success(data.message);
                fetchBlogs(); // Refresh the list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <tr className='border-y border-gray-300'>
            <th className='px-2 py-4 font-medium text-gray-600'>{index + 1}</th>
            <td className='px-2 py-4 text-gray-700'>{title}</td>
            <td className='px-2 py-4 max-sm:hidden text-gray-500'> {BlogDate.toDateString()} </td>
            <td className='px-2 py-4 max-sm:hidden'>
                <p className={`${blog.isPublished ? "text-green-600" : "text-orange-700"} font-medium`}>
                    {blog.isPublished ? 'Published' : 'Unpublished'}
                </p>
            </td>
            <td className='px-2 py-4 flex items-center text-xs gap-3'>
                {/* Button to Toggle Publish Status */}
                <button 
                    onClick={togglePublish}
                    className='border px-2 py-0.5 mt-1 rounded cursor-pointer hover:bg-gray-50 transition-colors'
                >
                    {blog.isPublished ? 'Unpublish' : 'Publish'}
                </button>
                
                {/* Icon to Delete Blog */}
                <img 
                    onClick={deleteBlog}
                    src={assets.cross_icon} 
                    className='w-8 hover:scale-110 transition-all cursor-pointer' 
                    alt="Delete" 
                />
            </td>
        </tr>
    )
}

export default BlogTableItem