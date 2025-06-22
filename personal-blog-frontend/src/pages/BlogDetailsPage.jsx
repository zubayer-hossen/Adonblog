import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import API from "../services/api";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await API.get(`/blogs/${id}`);
      setBlog(data);
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 mb-2">Category: {blog.category || "N/A"}</p>
      <p className="text-sm mb-2">Author: {blog.author?.name || "Anonymous"}</p>
      <p className="text-sm text-gray-400 mb-4">
        Created: {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      {blog.image && (
        <img
          src={`${blog.image}`}
          alt={blog.title}
          className="w-full object-cover rounded mb-4"
        />
      )}

      <div className="text-lg whitespace-pre-line">{blog.content}</div>

      <Link to="/" className="mt-6 inline-block text-blue-500 underline">
        ← Back to Home
      </Link>
    </div>
  );
};

export default BlogDetailsPage;
