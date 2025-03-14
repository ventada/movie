"use client";

import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "@/services/movieService";

interface MovieListPageProps {
  title: string;
  description: string;
  fetchMovies: () => Promise<Movie[]>;
  emptyMessage?: string;
  renderCustomCard?: (movie: Movie) => React.ReactNode;
}

const MovieListPage = ({
  title,
  description,
  fetchMovies,
  emptyMessage = "No movies found.",
  renderCustomCard,
}: MovieListPageProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20;

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (err) {
        console.error("Error loading movies:", err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [fetchMovies]);

  // Calculate pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-2xl w-full text-center">
          <p className="text-xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-lg max-w-3xl">{description}</p>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {movies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {emptyMessage}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {currentMovies.map((movie) => (
                <div key={movie.id}>
                  {renderCustomCard ? (
                    renderCustomCard(movie)
                  ) : (
                    <MovieCard
                      id={movie.id}
                      title={movie.title}
                      year={movie.year}
                      image={movie.image}
                      rating={movie.rating}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="inline-flex rounded-md shadow">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-50"
                    } dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700`}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 border border-gray-300 text-sm font-medium ${
                          currentPage === number
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        } dark:border-gray-600`}
                      >
                        {number}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-50"
                    } dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MovieListPage;
