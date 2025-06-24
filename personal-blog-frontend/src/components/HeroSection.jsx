import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import SocialLinks from "./SocialLinks";
import DateTimeCard from "./DateTime";
import BlogStatistics from "./BlogStatistics";

// Dummy banners
const heroBanners = [
  { id: 1, src: "banner1.jpg", alt: "Banner 1" },
  { id: 2, src: "banner2.jpg", alt: "Banner 2" },
  { id: 3, src: "banner3.jpg", alt: "Banner 3" },
];

// Gallery Images
const galleryImages = [
  { id: 1, src: "https://i.ibb.co/JWk13fWt/IMG-8517.jpg", alt: "Image 1" },
  {
    id: 2,
    src: "https://i.ibb.co/s9nv5nR0/54ebff33-f007-4468-82d3-f49ee8c19f7e.jpg",
    alt: "Image 2",
  },
  {
    id: 3,
    src: "https://i.ibb.co/cckn7XNp/3346d5ef-e240-4eec-8817-85d18b701acc.jpg",
    alt: "Image 3",
  },
  {
    id: 4,
    src: "https://i.ibb.co/fVGzC36h/2598123e-430a-4310-9f8f-e573b09753f5.jpg",
    alt: "Image 4",
  },
  {
    id: 5,
    src: "https://i.ibb.co/7LtPLjH/a4a6364b-6806-4873-96b1-56e522850347.jpg",
    alt: "Image 5",
  },
  {
    id: 6,
    src: "https://i.ibb.co/nqJGzwwc/d5752cee-0c9c-4d9b-ba91-b05bfd9fb8d2.jpg",
    alt: "Image 6",
  },
  {
    id: 7,
    src: "https://i.ibb.co/Z6HYBHPz/7f730b91-0a6b-44bf-8428-f168f5b48ec5.jpg",
    alt: "Image 7",
  },
  {
    id: 8,
    src: "https://i.ibb.co/kVR4b0Fn/8b3a8d6b-6e25-4506-95c9-7e2b7c6456b6.jpg",
    alt: "Image 8",
  },
  {
    id: 9,
    src: "https://i.ibb.co/ynYNpkGz/89cadddd-93f5-4296-b503-d42c9857bfb8.jpg",
    alt: "Image 9",
  },
  {
    id: 10,
    src: "https://i.ibb.co/FL9xfCFp/1739e33a-ab94-4a86-9b92-55a3825181a2.jpg",
    alt: "Image 10",
  },
  {
    id: 11,
    src: "https://i.ibb.co/FL9xfCFp/1739e33a-ab94-4a86-9b92-55a3825181a2.jpg",
    alt: "Image 11",
  },
  {
    id: 12,
    src: "https://i.ibb.co/k6wh2vwt/7432cd9b-b35d-41fc-affa-b52fb32b9132.jpg",
    alt: "Image 12",
  },
  {
    id: 13,
    src: "https://i.ibb.co/xSfRK1fY/a6f7b656-55e1-4b21-a5ff-d2b05a5b0dea.jpg",
    alt: "Image 13",
  },
  {
    id: 14,
    src: "https://i.ibb.co/1GYRPwY3/a4835eb7-038a-44c5-b512-0db1475738f1.jpg",
    alt: "Image 14",
  },
  {
    id: 15,
    src: "https://i.ibb.co/nvR131M/b6abfae1-fd50-4f08-ad26-31ab9e8440cc.jpg",
    alt: "Image 15",
  },
  {
    id: 16,
    src: "https://i.ibb.co/hJ8GDsyP/cb5c1322-abc7-4f3f-9578-2117f59a5143.jpg",
    alt: "Image 16",
  },
  {
    id: 17,
    src: "https://i.ibb.co/Sw7W143t/d81b13e9-5eb4-47d5-b12b-37892619f935.jpg",
    alt: "Image 17",
  },
  {
    id: 18,
    src: "https://i.ibb.co/ZzNKYkqg/e3366e89-0a5d-44ee-b1ef-5e0997a5260a.jpg",
    alt: "Image 18",
  },
  {
    id: 19,
    src: "https://i.ibb.co/cKdXKDZB/edca056f-d862-494b-9b74-7ef177864688.jpg",
    alt: "Image 19",
  },
  {
    id: 20,
    src: "https://i.ibb.co/RkP3KnNG/5c1d8353-4ac3-4a70-a495-fb8879bb51d4.jpg",
    alt: "Image 20",
  },
  {
    id: 21,
    src: "https://i.ibb.co/HfcJz8kH/7bf8359a-791d-424f-8ee5-5088b01feae5.jpg",
    alt: "Image 21",
  },
  {
    id: 22,
    src: "https://i.ibb.co/8DqTG1Pt/7bf8359a-791d-424f-8ee5-5088b01feae5-2.jpg",
    alt: "Image 22",
  },
  {
    id: 23,
    src: "https://i.ibb.co/tT9s5vdq/7c073a6b-8a9e-46d4-960f-e9f207b2afe2.jpg",
    alt: "Image 23",
  },
  {
    id: 24,
    src: "https://i.ibb.co/mV499BkJ/7c073a6b-8a9e-46d4-960f-e9f207b2afe2-2.jpg",
    alt: "Image 24",
  },
  {
    id: 25,
    src: "https://i.ibb.co/nsPvrQVZ/24e89613-9160-42c1-a068-103d7ba043a6.jpg",
    alt: "Image 25",
  },
  {
    id: 26,
    src: "https://i.ibb.co/fYxB7TTg/24e89613-9160-42c1-a068-103d7ba043a6-2.jpg",
    alt: "Image 26",
  },
  {
    id: 27,
    src: "https://i.ibb.co/ynMSMRz9/29b11eac-dc6d-4471-88a2-1a62d32712fa.jpg",
    alt: "Image 27",
  },
  {
    id: 28,
    src: "https://i.ibb.co/39KsK8mx/29b11eac-dc6d-4471-88a2-1a62d32712fa-2.jpg",
    alt: "Image 28",
  },
  {
    id: 29,
    src: "https://i.ibb.co/Tq1sDxd4/48fabd81-f38c-4f74-8190-12bc9945b1a4.jpg",
    alt: "Image 29",
  },
  {
    id: 30,
    src: "https://i.ibb.co/MDjYV2r2/168a9974-89be-43e8-9ce6-d58e9440cd3f.jpg",
    alt: "Image 30",
  },
  {
    id: 31,
    src: "https://i.ibb.co/MDjYV2r2/168a9974-89be-43e8-9ce6-d58e9440cd3f.jpg",
    alt: "Image 31",
  },
  {
    id: 32,
    src: "https://i.ibb.co/JjMcwYCJ/358c7906-2ccf-4b80-9c52-c0ba900b6572.jpg",
    alt: "Image 32",
  },
  {
    id: 33,
    src: "https://i.ibb.co/JjMcwYCJ/358c7906-2ccf-4b80-9c52-c0ba900b6572.jpg",
    alt: "Image 33",
  },
  {
    id: 34,
    src: "https://i.ibb.co/WNYS68xv/a0df3b33-a1a1-46b4-b4ba-e37e08c85c48.jpg",
    alt: "Image 34",
  },
  {
    id: 35,
    src: "https://i.ibb.co/Q3btLzSj/be33fe68-4c42-411b-9cf6-a165b0760b15.jpg",
    alt: "Image 35",
  },
  {
    id: 36,
    src: "https://i.ibb.co/Q3btLzSj/be33fe68-4c42-411b-9cf6-a165b0760b15.jpg",
    alt: "Image 36",
  },
  {
    id: 37,
    src: "https://i.ibb.co/gbGk5m9n/d85c58a4-bf4f-4608-9cf8-deca2b28801a.jpg",
    alt: "Image 37",
  },
  {
    id: 38,
    src: "https://i.ibb.co/gbGk5m9n/d85c58a4-bf4f-4608-9cf8-deca2b28801a.jpg",
    alt: "Image 38",
  },
  {
    id: 39,
    src: "https://i.ibb.co/ZRQymSc9/d2849184-795a-4801-a6dc-228343bd1a9c.jpg",
    alt: "Image 39",
  },
  {
    id: 40,
    src: "https://i.ibb.co/ZRQymSc9/d2849184-795a-4801-a6dc-228343bd1a9c.jpg",
    alt: "Image 40",
  },
  {
    id: 41,
    src: "https://i.ibb.co/mV1vdnZx/dba12266-d81b-4a0d-9b33-3d914ecd97c4.jpg",
    alt: "Image 41",
  },
  {
    id: 42,
    src: "https://i.ibb.co/j9bwRVkj/87032e22-5cac-4456-8974-005b61b74ed1.jpg",
    alt: "Image 42",
  },
  {
    id: 43,
    src: "https://i.ibb.co/j9bwRVkj/87032e22-5cac-4456-8974-005b61b74ed1.jpg",
    alt: "Image 43",
  },
  {
    id: 44,
    src: "https://i.ibb.co/j9bwRVkj/87032e22-5cac-4456-8974-005b61b74ed1.jpg",
    alt: "Image 44",
  },
  {
    id: 45,
    src: "https://i.ibb.co/Pzx4kk5S/90f40219-c00d-4c83-b1aa-ac8fbd01ec1a.jpg",
    alt: "Image 45",
  },
  {
    id: 46,
    src: "https://i.ibb.co/6JntpYm0/83dc1e84-89be-4d14-9c5f-2c12eeb2c7f3.jpg",
    alt: "Image 46",
  },
  {
    id: 47,
    src: "https://i.ibb.co/4ZnVQM76/97dadd93-10db-41c6-821c-c0401421361f.jpg",
    alt: "Image 47",
  },
  {
    id: 48,
    src: "https://i.ibb.co/RpZj1Fzv/302b444d-d8ee-4098-a6b5-4cc524fd7e22.jpg",
    alt: "Image 48",
  },
  {
    id: 49,
    src: "https://i.ibb.co/ycSVTkWj/3aa2b22f-a587-4b2a-b6de-785b9682699f.jpg",
    alt: "Image 49",
  },
  {
    id: 50,
    src: "https://i.ibb.co/LhcM1G5p/4e5571f3-18e4-4807-979e-c8767454b429.jpg",
    alt: "Image 50",
  },
  {
    id: 51,
    src: "https://i.ibb.co/GfWj2V5h/828747f0-a691-4058-9510-e220e3763c15.jpg",
    alt: "Image 51",
  },
  {
    id: 52,
    src: "https://i.ibb.co/27Zk0gTj/66b7f461-b20e-40c4-8926-61a86b73d6f9.jpg",
    alt: "Image 52",
  },
  {
    id: 53,
    src: "https://i.ibb.co/n8kzDvWM/b5c9cced-a282-4751-9775-ec3291c7d3b4.jpg",
    alt: "Image 53",
  },
  {
    id: 54,
    src: "https://i.ibb.co/cKHYBTNW/7e514a03-cbc8-4e33-a904-e875614aa81b.jpg",
    alt: "Image 54",
  },
  {
    id: 55,
    src: "https://i.ibb.co/tPHVfx4y/066cdcca-42d4-4d6f-9151-431288e9f1bf.jpg",
    alt: "Image 55",
  },
  {
    id: 56,
    src: "https://i.ibb.co/rG2Wbn0m/763eb8d1-099f-4d4d-9e68-925c2501c16b.jpg",
    alt: "Image 56",
  },
  {
    id: 57,
    src: "https://i.ibb.co/tpykb9s5/d099ab65-8a93-41da-8d73-9cd861809e97.jpg",
    alt: "Image 57",
  },
  {
    id: 58,
    src: "https://i.ibb.co/JRdcqPjx/ecdb053b-97a0-4dc8-a9e8-f1b6632a0122.jpg",
    alt: "Image 58",
  },
  {
    id: 59,
    src: "https://i.ibb.co/Vc7BSK69/ecdb053b-97a0-4dc8-a9e8-f1b6632a0122-2.jpg",
    alt: "Image 59",
  },
  {
    id: 60,
    src: "https://i.ibb.co/1Gvf77QK/a0b18966-461c-4aab-9c74-3bb13f6b94da.jpg",
    alt: "Image 60",
  },
  {
    id: 61,
    src: "https://i.ibb.co/7mJg2jG/a0b18966-461c-4aab-9c74-3bb13f6b94da-2.jpg",
    alt: "Image 61",
  },
  {
    id: 62,
    src: "https://i.ibb.co/7thw59gK/29757a4a-d4d3-46a1-ac64-099b3c0c0311.jpg",
    alt: "Image 62",
  },
  {
    id: 63,
    src: "https://i.ibb.co/h6G5bSt/a69c2291-ec30-4555-88e4-9a5951c5b055.jpg",
    alt: "Image 63",
  },
  {
    id: 64,
    src: "https://i.ibb.co/Pvs8bnSn/13c3eeea-2875-4b78-a86e-03bfe29890e6.jpg",
    alt: "Image 64",
  },
  {
    id: 65,
    src: "https://i.ibb.co/fVcPwcfM/14ff5247-e0db-4332-b7a0-45bcba133002.jpg",
    alt: "Image 65",
  },
  {
    id: 66,
    src: "https://i.ibb.co/DPMhLPMQ/29ad26ab-fb78-44cd-891b-e588d64f543c.jpg",
    alt: "Image 66",
  },
  {
    id: 67,
    src: "https://i.ibb.co/gLwCTKkg/504260159-17853409623454993-6081939436270152729-n.jpg",
    alt: "Image 67",
  },
  {
    id: 68,
    src: "https://i.ibb.co/Kppn3wft/484051291-122161139690324085-2428346724630378676-n.jpg",
    alt: "Image 68",
  },
  {
    id: 69,
    src: "https://i.ibb.co/ym3DrxGd/503896325-17853409605454993-2823211170656690157-n.jpg",
    alt: "Image 69",
  },
  {
    id: 70,
    src: "https://i.ibb.co/21N2tmzK/472934089-122151000266324085-4145025628840180273-n.jpg",
    alt: "Image 70",
  },
  {
    id: 71,
    src: "https://i.ibb.co/67269vxf/504472775-17853409632454993-7805500479543292401-n.jpg",
    alt: "Image 71",
  },
  {
    id: 72,
    src: "https://i.ibb.co/JwLS2VwR/505132029-17853409614454993-963601118754807695-n.jpg",
    alt: "Image 72",
  },
];

// Features
const features = [
  {
    id: 1,
    title: "⚡ Ultra Fast",
    desc: "Optimized for lightning fast load speed.",
  },
  {
    id: 2,
    title: "🎨 Modern Design",
    desc: "Beautiful gradients, smooth transitions, perfect typography.",
  },
  {
    id: 3,
    title: "🔒 Secure System",
    desc: "Protected routes with token-based authentication.",
  },
  {
    id: 4,
    title: "🖼️ Interactive Gallery",
    desc: "Fully responsive lightbox-enabled image gallery.",
  },
];

// stats
const stats = [
  {
    id: 1,
    number: 1200,
    label: "Total Posts",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: 2,
    number: 4500,
    label: "Total Views",
    color: "from-pink-500 to-red-600",
  },
  {
    id: 3,
    number: 800,
    label: "Total Comments",
    color: "from-green-400 to-teal-600",
  },
  {
    id: 4,
    number: 150,
    label: "Total Authors",
    color: "from-yellow-400 to-orange-500",
  },
];

// Testimonials
const testimonials = [
  {
    id: 1,
    quote: "Amazing content! Always informative & inspiring.",
    name: "Nusrat",
  },
  { id: 2, quote: "Best blog platform I've used. Keep it up!", name: "Gofur" },
  {
    id: 3,
    quote: "Fantastic design, super easy to navigate!",
    name: "Abrumoni",
  },
];

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await API.get("/blogs");
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const visibleImages = showAll ? galleryImages : galleryImages.slice(0, 5);
  const slides = galleryImages.map((img) => ({
    src: img.src,
    alt: img.alt,
    description: img.alt,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Date Time  */}
      <DateTimeCard />
      {/* Hero Carousel */}
      <div className="mt-10 mb-10">
        <Carousel
          autoPlay
          infiniteLoop
          interval={4000}
          showThumbs={false}
          showStatus={false}
          className="rounded-3xl shadow-2xl"
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
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-12 drop-shadow-md">
          Latest Blog Posts ✨
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="relative group bg-white rounded-3xl shadow-xl border border-purple-200 overflow-hidden hover:scale-105 transition duration-500"
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
                <h2 className="text-2xl font-bold text-gray-800 mb-2 px-4">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4 px-4">
                  {blog.category ? `Category: ${blog.category}` : "No Category"}
                </p>
                <div className="px-4 pb-4">
                  <Link
                    to={`/blog/${blog._id}`}
                    className="inline-block bg-gradient-to-r from-indigo-400 to-pink-400 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] py-20 px-6 overflow-hidden">
        {/* Full rainbow animated overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-green-400 via-yellow-400 to-red-500 opacity-40 animate-gradientMove"></div>

        <h2 className="text-5xl font-extrabold text-center text-white mb-16 drop-shadow-xl relative z-10">
          💛 ADON'S PERSONAL GALLERY 💛
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 relative z-10">
          {visibleImages.map((image, i) => (
            <div
              key={image.id}
              className="group relative cursor-pointer perspective"
              onClick={() => {
                setPhotoIndex(i);
                setLightboxOpen(true);
              }}
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 transform group-hover:rotate-[5deg] group-hover:scale-105 bg-white/10 backdrop-blur-lg border border-white/20">
                {/* Animated neon border */}
                <div className="absolute -inset-1 z-0 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-lg opacity-80 animate-neonPulse"></div>

                {/* Image with 3D effect */}
                <div className="relative z-10 transform transition-transform duration-700 group-hover:rotate-y-[15deg] group-hover:-rotate-x-[10deg]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-80 object-cover rounded-3xl transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-700 z-20">
                  <div className="absolute bottom-5 left-5 text-white text-lg font-bold drop-shadow-md animate-fadeInUp">
                    {image.alt}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="flex justify-center mt-20 relative z-10">
            <button
              onClick={() => setShowAll(true)}
              className="px-10 py-4 bg-gradient-to-r from-fuchsia-500 to-indigo-600 text-white rounded-full text-xl font-bold shadow-xl hover:scale-105 transition duration-300"
            >
              Show More
            </button>
          </div>
        )}

        {lightboxOpen && (
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={slides}
            index={photoIndex}
            plugins={[Fullscreen, Zoom, Captions]}
          />
        )}
      </div>

      {/* Features */}
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

      {/* Stats */}
      <BlogStatistics stats={stats} />
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

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-16 px-6 flex flex-col items-center text-white min-h-[300px]">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg select-none">
          Subscribe to Our Newsletter 💌
        </h2>
        <p className="mb-10 max-w-xl text-lg sm:text-xl text-center drop-shadow-md">
          Stay updated with our latest blog posts and exclusive offers!
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // handle subscription logic here
          }}
          className="w-full max-w-md flex flex-col sm:flex-row gap-4 sm:gap-0 bg-white/10 backdrop-blur-lg rounded-3xl shadow-[8px_8px_20px_rgba(0,0,0,0.15),-8px_-8px_20px_rgba(255,255,255,0.15)] p-1"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="flex-grow px-5 py-4 rounded-3xl text-gray-900 font-medium outline-none focus:ring-4 focus:ring-purple-400 transition"
          />
          <button
            type="submit"
            className="bg-indigo-700 hover:bg-indigo-900 rounded-3xl px-8 py-4 font-bold transition-transform active:scale-95 shadow-lg"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Social Links  */}
      <SocialLinks />
    </div>
  );
};

export default HomePage;
