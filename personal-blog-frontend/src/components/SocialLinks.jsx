import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";

export default function SocialLinks() {
  const links = [
    {
      icon: <FaFacebook />,
      url: "https://facebook.com",
      color: "from-blue-400 to-blue-700",
    },
    {
      icon: <FaInstagram />,
      url: "https://instagram.com",
      color: "from-pink-400 to-purple-600",
    },
    {
      icon: <FaTwitter />,
      url: "https://twitter.com",
      color: "from-cyan-400 to-blue-500",
    },
    {
      icon: <FaLinkedin />,
      url: "https://linkedin.com",
      color: "from-blue-600 to-indigo-700",
    },
    {
      icon: <FaGithub />,
      url: "https://github.com",
      color: "from-gray-700 to-black",
    },
    {
      icon: <FaYoutube />,
      url: "https://youtube.com",
      color: "from-red-500 to-red-700",
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative text-white text-3xl p-4 rounded-full bg-gradient-to-br ${link.color} shadow-lg transition transform hover:scale-110 hover:rotate-3 duration-500`}
          >
            {link.icon}

            {/* Glowing animated ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-lg opacity-50 group-hover:opacity-80 animate-neonGlow z-[-1]"></div>
          </a>
        ))}
      </div>
    </div>
  );
}
