import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import CommentTableItem from '../../components/CommentTableItem'
import toast from 'react-hot-toast'

const Comments = () => {
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState("Not Approved") 
  const { axios } = useAppContext(); 

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/admin/comments');
      
      if (data.success) {
        console.log("Fetched Comments:", data.comments);
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [])

  // Logic to filter comments based on the 'filter' state
  const filteredComments = comments.filter((comment) => {
    if (filter === "Approved") return comment.isApproved === true;
    if (filter === "Not Approved") return comment.isApproved === false;
    // Added "All" logic
    if (filter === "All") return true; 
    return true;
  });

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <div className='flex justify-between items-center max-w-3xl'>
        <h1 className='text-xl font-semibold text-gray-800'>Comments</h1>
        <div className='flex gap-4'>
          {/* Added "All" Button */}
          <button 
            onClick={() => setFilter('All')} 
            className={`border rounded-full px-4 py-1 text-xs transition-all ${filter === 'All' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
          >
            All
          </button>

          <button 
            onClick={() => setFilter('Approved')} 
            className={`border rounded-full px-4 py-1 text-xs transition-all ${filter === 'Approved' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
          >
            Approved
          </button>

          <button 
            onClick={() => setFilter('Not Approved')} 
            className={`border rounded-full px-4 py-1 text-xs transition-all ${filter === 'Not Approved' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg'>
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3"> Blog Title & Comment </th>
              <th className="px-6 py-3 max-sm:hidden"> Date </th>
              <th className="px-6 py-3"> Action </th>
            </tr>
          </thead>
          <tbody>
            {filteredComments.length > 0 ? (
              filteredComments.map((comment, index) => (
                <CommentTableItem 
                  key={comment._id} 
                  comment={comment} 
                  index={index + 1} 
                  fetchComments={fetchComments}
                />
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-10">
                  No {filter.toLowerCase()} comments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments