"use client";

import { useCallback } from "react";
import MovieListPage from "@/components/MovieListPage";
import RankedMovieCard from "@/components/RankedMovieCard";
import {
  getPopularMovies,
  getMockMovies,
  Movie,
} from "@/services/movieService";

export default function PopularMoviesPage() {
  const fetchMovies = useCallback(async (): Promise<Movie[]> => {
    try {
      // Try to fetch from API first
      const apiMovies = await getPopularMovies();

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
      console.error("Error fetching popular movies:", error);
      return getMockMovies();
    }
  }, []);

  const renderCustomCard = useCallback((movie: Movie) => {
    return <RankedMovieCard movie={movie} />;
  }, []);

  return (
    <MovieListPage
      title="Most Popular Movies"
      description="The most popular movies currently trending on IMDb. These films are capturing the attention of movie fans around the world."
      fetchMovies={fetchMovies}
      emptyMessage="No popular movies found. Please try again later."
      renderCustomCard={renderCustomCard}
    />
  );
}
