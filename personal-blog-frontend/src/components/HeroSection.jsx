import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Hero Carousel Data
const heroBanners = [
  { id: 1, src: "banner1.jpg", alt: "Banner 1" },
  { id: 2, src: "banner2.jpg", alt: "Banner 2" },
  { id: 3, src: "banner3.jpg", alt: "Banner 3" },
];

// Gallery Data
const galleryImages = [
  { id: 1, src: "/assets/gallery/gallery1.jpg", alt: "Gallery Image 1" },
  { id: 2, src: "/assets/gallery/gallery2.jpg", alt: "Gallery Image 2" },
  { id: 3, src: "/assets/gallery/gallery3.jpg", alt: "Gallery Image 3" },
  { id: 4, src: "/assets/gallery/gallery4.jpg", alt: "Gallery Image 4" },
];

// Features Data
const features = [
  {
    id: 1,
    title: "⚡ Fast Loading",
    desc: "Super fast performance with optimized images and caching.",
  },
  {
    id: 2,
    title: "🎨 Beautiful Design",
    desc: "Stunning modern design with smooth gradients and animations.",
  },
  {
    id: 3,
    title: "🔒 Secure & Protected",
    desc: "Strong authentication system with protected admin panel.",
  },
];

// Stats Data
const stats = [
  { id: 1, number: "120+", label: "Published Blogs", color: "indigo" },
  { id: 2, number: "350+", label: "Happy Readers", color: "pink" },
  { id: 3, number: "5⭐", label: "Top Rated Blog", color: "green" },
];

// Testimonials Data
const testimonials = [
  {
    id: 1,
    quote: "Amazing blog content. I always get inspired by the new posts!",
    name: "Nusrat",
  },
  {
    id: 2,
    quote: "Beautiful design & very easy to read. I visit every week.",
    name: "Gofur",
  },
  {
    id: 3,
    quote: "Perfect performance and so clean interface. Love it!",
    name: "Abrumoni",
  },
];

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="mt-10 mb-10">
        <Carousel
          autoPlay
          infiniteLoop
          interval={4000}
          showThumbs={false}
          showStatus={false}
          className="rounded-2xl shadow-2xl overflow-hidden"
        >
          {heroBanners.map((banner) => (
            <div key={banner.id}>
              <img
                src={banner.src}
                alt={banner.alt}
                className="h-[500px] object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Blog Cards */}
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10 drop-shadow-md">
          Latest Blog Posts ✨
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

      {/* Gallery Section */}
      <div className="bg-white py-16">
        <h2 className="text-4xl font-bold text-center text-pink-600 mb-10">
          Image Gallery 📸
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-10">
          {galleryImages.map((image) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.alt}
              className="rounded-xl shadow-lg hover:scale-105 transition duration-500"
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 py-16">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
          Why Choose Our Blog? 🚀
        </h2>
        <div className="flex flex-wrap justify-center gap-10 px-10">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-8 rounded-2xl shadow-xl w-80 text-center hover:scale-105 transition"
            >
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <h2 className="text-4xl font-bold text-center text-purple-600 mb-10">
          Blog Statistics 📊
        </h2>
        <div className="flex justify-center gap-20 text-center">
          {stats.map((stat) => (
            <div key={stat.id}>
              <h3 className={`text-5xl font-bold text-${stat.color}-700 mb-2`}>
                {stat.number}
              </h3>
              <p className="text-xl">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
          What Our Readers Say 🗣️
        </h2>
        <div className="flex flex-wrap justify-center gap-10 px-10">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-2xl shadow-xl w-80 text-center hover:scale-105 transition"
            >
              <p className="italic mb-3">"{testimonial.quote}"</p>
              <h4 className="font-semibold text-lg text-indigo-600">
                — {testimonial.name}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-400 to-pink-400 py-16 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          Subscribe to Our Newsletter 💌
        </h2>
        <p className="mb-10 text-lg">
          Stay updated with our latest blog posts and offers!
        </p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-4 rounded-l-lg text-gray-800 w-96"
          />
          <button className="bg-indigo-700 p-4 rounded-r-lg font-bold hover:bg-indigo-900 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
