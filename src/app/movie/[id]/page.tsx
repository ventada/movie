"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMovieDetails, getMockMovies } from "@/services/movieService";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MovieDetailsPage({ params }: any) {
  const { id } = params;
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

  // Placeholder image as a base64 data URL
  const placeholderImage =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+Tm8gSW1hZ2UgQXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError("");

      try {
        // First try to get from API
        const details = await getMovieDetails(id);

        if (details) {
          setMovie(details);
        } else {
          // If API fails, try to get from mock data
          const mockMovies = [
            ...getMockMovies(),
            ...getMockMovies().map((m) => ({
              ...m,
              id: `tt${Math.floor(Math.random() * 10000000)}`,
            })),
          ];
          const mockMovie = mockMovies.find((m) => m.id === id);

          if (mockMovie) {
            setMovie(mockMovie);
          } else {
            setError("Movie not found");
          }
        }
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-2xl w-full text-center mb-6">
          <p className="text-xl font-semibold">{error || "Movie not found"}</p>
        </div>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Movie Hero Section */}
      <div className="relative h-[70vh]">
        <Image
          src={imageError ? placeholderImage : movie.image || placeholderImage}
          alt={movie.title}
          fill
          priority
          className="object-cover"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white w-full">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="text-lg">{movie.year}</span>
              {movie.rating && (
                <span className="bg-yellow-500 text-black font-bold px-2 py-1 rounded text-sm">
                  ⭐ {movie.rating}
                </span>
              )}
              {movie.runtime && <span>{movie.runtime}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster Column */}
          <div className="md:col-span-1">
            <div className="relative h-[450px] w-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src={
                  imageError
                    ? placeholderImage
                    : movie.image || placeholderImage
                }
                alt={movie.title}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Overview
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
              {movie.description || "No description available."}
            </p>

            {movie.genres && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Genres
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre: string, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {movie.director && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Director
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {movie.director}
                </p>
              </div>
            )}

            {movie.cast && movie.cast.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Cast
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {movie.cast.slice(0, 6).map((actor: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        {actor.image ? (
                          <Image
                            src={actor.image}
                            alt={actor.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : (
                          <span className="text-xs">
                            {actor.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {actor.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
