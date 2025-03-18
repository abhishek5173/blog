import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [blogs, setblogs] = useState([])
  const [title, settitle] = useState("")
  const [content, setcontent] = useState("")
  const [author, setauthor] = useState("")

  useEffect(() => {
    fetchblogs()
  }, []);

  const fetchblogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/blog/all')
      setblogs(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const createblog = async () => {
    try {
      if (!title || !content || !author) {
        return alert('Please fill all fields')
      }
      const newblog = { title, content, author }
      const res = await axios.post('http://localhost:5000/api/blog/post', newblog)
      fetchblogs();
      settitle("")
      setcontent("")
      setauthor("")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Create Blog</h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            placeholder="Title"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            placeholder="Content"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={author}
            onChange={(e) => setauthor(e.target.value)}
            placeholder="Author"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={createblog}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Create Blog
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">All Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              className="border border-gray-300 bg-white shadow-md rounded-lg p-4"
              key={blog._id}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">Title: {blog.title}</h3>
              <p className="text-gray-700 mb-2">Content: {blog.content}</p>
              <p className="text-gray-600">Author: {blog.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
