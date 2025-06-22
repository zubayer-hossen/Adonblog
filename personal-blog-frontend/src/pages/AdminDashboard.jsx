import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router";

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const { data } = await API.get("/blogs");
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await API.delete(`/blogs/${id}`);
      fetchBlogs();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <Link
        to="/admin/blog-form"
        className="mb-4 inline-block bg-green-500 text-white px-4 py-2 rounded"
      >
        Create New Blog
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="p-4 border rounded shadow">
            <h3 className="font-bold text-xl">{blog.title}</h3>
            <p className="text-sm text-gray-500">
              Category: {blog.category || "N/A"}
            </p>
            {blog.image && (
              <img
                src={`http://localhost:5000${blog.image}`}
                alt={blog.title}
                className="w-full h-40 object-cover my-2 rounded"
              />
            )}
            <div className="flex space-x-2">
              <Link
                to={`/admin/blog-form?id=${blog._id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
