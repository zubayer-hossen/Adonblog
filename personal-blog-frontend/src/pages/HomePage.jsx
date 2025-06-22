import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router";
import HeroSection from "../components/HeroSection"; // Import new Hero

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await API.get("/blogs");
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-10 ">
      <HeroSection /> {/* Inserted here */}
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700 drop-shadow-md">
        Adon's Awesome Blog 📝
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-3xl shadow-xl transform transition hover:-translate-y-3 hover:scale-105 duration-500 p-4 border border-purple-200 relative overflow-hidden"
          >
            <div className="absolute w-40 h-40 bg-gradient-to-tr from-pink-400 to-indigo-400 rounded-full opacity-20 -top-10 -right-10 z-0"></div>

            <div className="relative z-10">
              {blog.image && (
                <img
                  src={`http://localhost:5000${blog.image}`}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {blog.category ? `Category: ${blog.category}` : "No Category"}
              </p>
              <Link
                to={`/blog/${blog._id}`}
                className="inline-block bg-gradient-to-r from-indigo-400 to-pink-400 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
