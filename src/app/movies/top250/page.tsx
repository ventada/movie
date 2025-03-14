"use client";

import { useCallback } from "react";
import MovieListPage from "@/components/MovieListPage";
import RankedMovieCard from "@/components/RankedMovieCard";
import { getTopMovies, getMockMovies, Movie } from "@/services/movieService";

export default function Top250MoviesPage() {
  const fetchMovies = useCallback(async (): Promise<Movie[]> => {
    try {
      // Try to fetch from API first
      const apiMovies = await getTopMovies();

      if (apiMovies.length > 0) {
        return apiMovies;
      }

      // Fallback to mock data if API fails
      return getMockMovies().sort((a, b) => {
        const rankA = a.rank || 999;
        const rankB = b.rank || 999;
        return rankA - rankB;
      });
    } catch (error) {
      console.error("Error fetching top 250 movies:", error);
      return getMockMovies();
    }
  }, []);

  const renderCustomCard = useCallback((movie: Movie) => {
    return <RankedMovieCard movie={movie} />;
  }, []);

  return (
    <MovieListPage
      title="IMDb Top 250 Movies"
      description="The top rated movies of all time as voted by IMDb users. These timeless classics and modern masterpieces represent the best in cinema."
      fetchMovies={fetchMovies}
      emptyMessage="No top movies found. Please try again later."
      renderCustomCard={renderCustomCard}
    />
  );
}
