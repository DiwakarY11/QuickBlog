import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import BlogTableItem from '../../components/BlogTableItem'
import { useAppContext } from '../../context/appContext'
import toast from 'react-hot-toast'

const Dashboard = () => {
  // Use context to get the configured axios instance
  const { axios } = useAppContext();
  
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  // Screenshot logic: Fetching real data from the admin dashboard API
  const fetchDashboard = async () => {
    try {
      // Ensure this endpoint exists in your backend (e.g., adminRouter)
      const { data } = await axios.get('/api/admin/dashboard')
      
      if (data.success) {
        setDashboardData(data.dashboardData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      // Screenshot error handling
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      <div className='flex flex-row flex-wrap gap-4'>
        {/* Summary Cards */}
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_1} alt=""/>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light'>Blogs</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_2} alt=""/>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
            <p className='text-gray-400 font-light'>Comments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_3} alt=""/>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
            <p className='text-gray-400 font-light'>Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
          <img src={assets.dashboard_icon_4} alt=""/>
          <p>Latest Blogs</p>
        </div>

        <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-gray-600 text-left uppercase'>
              <tr>
                <th scope='col' className='px-2 py-4 xl:px-6'> # </th>
                <th scope='col' className='px-2 py-4'> Blog Title </th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'> Date </th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'> Status </th>
                <th scope='col' className='px-2 py-4'> Actions </th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => (
                  <BlogTableItem 
                    key={blog._id} 
                    blog={blog} 
                    fetchBlogs={fetchDashboard} 
                    index={index} 
                  />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard