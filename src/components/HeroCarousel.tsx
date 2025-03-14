"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Movie {
  id: string;
  title: string;
  image: string;
  description?: string;
}

interface HeroCarouselProps {
  movies: Movie[];
}

const HeroCarousel = ({ movies }: HeroCarouselProps) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Placeholder image as a base64 data URL (dark background with film icon)
  const placeholderImage =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzEyMTIxMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjM2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0id2hpdGUiPk1vdmllIEJhbm5lcjwvdGV4dD48L3N2Zz4=";

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  // Add slick carousel CSS dynamically
  useEffect(() => {
    const linkEl = document.createElement("link");
    linkEl.rel = "stylesheet";
    linkEl.href =
      "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css";
    document.head.appendChild(linkEl);

    const linkEl2 = document.createElement("link");
    linkEl2.rel = "stylesheet";
    linkEl2.href =
      "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css";
    document.head.appendChild(linkEl2);

    return () => {
      document.head.removeChild(linkEl);
      document.head.removeChild(linkEl2);
    };
  }, []);

  const handleImageError = (movieId: string) => {
    setImageErrors((prev) => ({ ...prev, [movieId]: true }));
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="relative">
            <div className="relative h-[500px] w-full">
              <Image
                src={
                  imageErrors[movie.id]
                    ? placeholderImage
                    : movie.image || placeholderImage
                }
                alt={movie.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                onError={() => handleImageError(movie.id)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white w-full md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  {movie.title}
                </h2>
                {movie.description && (
                  <p className="text-lg mb-4 line-clamp-2">
                    {movie.description}
                  </p>
                )}
                <Link
                  href={`/movie/${movie.id}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
