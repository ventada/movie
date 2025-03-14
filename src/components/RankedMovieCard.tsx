"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/services/movieService";

interface RankedMovieCardProps {
  movie: Movie;
}

const RankedMovieCard = ({ movie }: RankedMovieCardProps) => {
  const [imageError, setImageError] = useState(false);

  // Placeholder image as a base64 data URL
  const placeholderImage =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+Tm8gSW1hZ2UgQXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <Link href={`/movie/${movie.id}`}>
        <div className="relative h-64 w-full">
          <Image
            src={
              imageError ? placeholderImage : movie.image || placeholderImage
            }
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            onError={() => setImageError(true)}
          />
          {movie.rank && (
            <div className="absolute top-2 left-2 bg-blue-600 text-white font-bold px-3 py-1 rounded-full text-sm">
              #{movie.rank}
            </div>
          )}
          {movie.rating && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-black font-bold px-2 py-1 rounded text-sm">
              ⭐ {movie.rating}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 truncate dark:text-white">
            {movie.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {movie.year}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default RankedMovieCard;
