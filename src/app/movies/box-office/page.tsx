"use client";

import { useCallback } from "react";
import MovieListPage from "@/components/MovieListPage";
import BoxOfficeCard from "@/components/BoxOfficeCard";
import {
  getTopBoxOffice,
  getMockBoxOffice,
  Movie,
} from "@/services/movieService";

export default function BoxOfficePage() {
  const fetchMovies = useCallback(async (): Promise<Movie[]> => {
    try {
      // Try to fetch from API first
      const apiMovies = await getTopBoxOffice();

      if (apiMovies.length > 0) {
        return apiMovies;
      }

      // Fallback to mock data if API fails
      return getMockBoxOffice();
    } catch (error) {
      console.error("Error fetching box office movies:", error);
      return getMockBoxOffice();
    }
  }, []);

  const renderCustomCard = useCallback((movie: Movie) => {
    return <BoxOfficeCard movie={movie} />;
  }, []);

  return (
    <MovieListPage
      title="Top Box Office"
      description="Movies that are currently performing well at the box office. These films are drawing audiences to theaters around the world."
      fetchMovies={fetchMovies}
      emptyMessage="No box office data found. Please try again later."
      renderCustomCard={renderCustomCard}
    />
  );
}
