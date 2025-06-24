import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

export default function DateTimeCard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const date = currentTime.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = currentTime.toLocaleTimeString();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <div className="relative w-full max-w-md mx-auto p-6 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl text-white text-center space-y-8">
        {/* Neon Glow */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-lg opacity-60 animate-neonGlow z-[-1]"></div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide animate-pulse">
          📅 Date & Time
        </h2>

        {/* Date */}
        <div className="flex items-center justify-center gap-3">
          <div className="bg-pink-500/30 p-3 rounded-full">
            <FaCalendarAlt className="text-pink-300 text-3xl" />
          </div>
          <p className="text-lg sm:text-xl font-medium">{date}</p>
        </div>

        {/* Divider */}
        <div className="w-full h-[2px] bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 opacity-50"></div>

        {/* Time */}
        <div className="flex items-center justify-center gap-3">
          <div className="bg-yellow-500/30 p-3 rounded-full">
            <FaClock className="text-yellow-300 text-3xl" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold">{time}</p>
        </div>
      </div>
    </div>
  );
}
