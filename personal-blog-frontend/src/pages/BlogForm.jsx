import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useSearchParams } from "react-router"; // Fixed react-router import

const BlogForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (blogId) {
        try {
          const { data } = await API.get(`/blogs/${blogId}`);
          setTitle(data.title);
          setContent(data.content);
          setCategory(data.category);
          setImage(data.image);
        } catch (error) {
          console.error("Error fetching blog:", error);
        }
      }
    };
    fetchBlog();
  }, [blogId]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const { data } = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImage(data.imageUrl);
    } catch (err) {
      console.error("Image upload error:", err);
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = { title, content, category, image };
    try {
      if (blogId) {
        await API.put(`/blogs/${blogId}`, blogData);
      } else {
        await API.post("/blogs", blogData);
      }
      navigate("/admin");
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {blogId ? "Edit Blog" : "Create Blog"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 border rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input type="file" onChange={uploadFileHandler} />
        {uploading && <p>Uploading...</p>}
        {image && (
          <img
            src={`${process.env.REACT_APP_API_URL}${image}`} // Dynamically load full URL
            alt="Uploaded"
            className="w-full h-40 object-cover rounded"
          />
        )}
        <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
          {blogId ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
