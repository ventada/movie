import SearchBar from "@/components/SearchBar";
import HeroCarousel from "@/components/HeroCarousel";
import MovieGrid from "@/components/MovieGrid";
import { getMockMovies, getMockHeroMovies } from "@/services/movieService";

export default function Home() {
  // Using mock data for now
  const heroMovies = getMockHeroMovies();
  const popularMovies = getMockMovies();
  const topRatedMovies = [...getMockMovies()]
    .sort((a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0"))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Carousel */}
      <HeroCarousel movies={heroMovies} />

      {/* Search Bar */}
      <div className="py-6 bg-white dark:bg-gray-800 shadow-md">
        <SearchBar />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Popular Movies Section */}
        <MovieGrid
          title="Popular Movies"
          movies={popularMovies}
          seeAllLink="/movies/popular"
        />

        {/* Top Rated Movies Section */}
        <MovieGrid
          title="Top Rated Movies"
          movies={topRatedMovies}
          seeAllLink="/movies/top-rated"
        />
      </div>
    </div>
  );
}
