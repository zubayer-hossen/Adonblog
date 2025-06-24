import React, { useEffect, useState } from "react";

export default function BlogStatistics({ stats }) {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 1800;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);

    const counters = stats.map((stat) => stat.number);
    let frame = 0;

    const counterInterval = setInterval(() => {
      frame++;
      setCounts((prev) =>
        prev.map((count, i) => {
          const progress = Math.min(frame / totalFrames, 1);
          return Math.floor(progress * counters[i]);
        })
      );
      if (frame === totalFrames) clearInterval(counterInterval);
    }, frameDuration);

    return () => clearInterval(counterInterval);
  }, [stats]);

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl sm:text-5xl font-extrabold mb-14 text-center text-indigo-800 select-none drop-shadow-md">
        Blog Statistics 📊
      </h2>

      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((stat, idx) => (
          <div
            key={stat.id}
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-[10px_10px_30px_rgba(0,0,0,0.12),-10px_-10px_30px_rgba(255,255,255,0.7)] border border-white/30 hover:shadow-[inset_4px_4px_10px_rgba(255,255,255,0.6),inset_-4px_-4px_10px_rgba(0,0,0,0.1)] transition-shadow duration-500 cursor-default flex flex-col items-center"
          >
            <h3
              className={`text-6xl font-extrabold mb-3 bg-clip-text text-transparent ${stat.color} select-text`}
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #7b5cf5, #3b82f6, #06b6d4)",
              }}
            >
              {counts[idx].toLocaleString()}
            </h3>
            <p className="text-lg font-semibold text-indigo-700 mt-1 text-center">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
