import React from "react";

const ImageCard = ({ src, alt }) => {
  return (
    <div className="rounded-xl shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

export default ImageCard;
