"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/services/movieService";

interface BoxOfficeCardProps {
  movie: Movie;
}

const BoxOfficeCard = ({ movie }: BoxOfficeCardProps) => {
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
          {movie.weeks && (
            <div className="absolute top-2 right-2 bg-green-500 text-white font-bold px-2 py-1 rounded text-sm">
              {movie.weeks} {movie.weeks === 1 ? "week" : "weeks"}
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

          <div className="mt-3 space-y-1">
            {movie.weekend && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Weekend:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {movie.weekend}
                </span>
              </div>
            )}
            {movie.gross && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Gross:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {movie.gross}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BoxOfficeCard;
