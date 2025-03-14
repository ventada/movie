import MovieCard from "./MovieCard";

interface Movie {
  id: string;
  title: string;
  year: string;
  image: string;
  rating?: string;
}

interface MovieGridProps {
  title: string;
  movies: Movie[];
  seeAllLink?: string;
}

const MovieGrid = ({ title, movies, seeAllLink }: MovieGridProps) => {
  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold dark:text-white">{title}</h2>
        {seeAllLink && (
          <a
            href={seeAllLink}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            See All
          </a>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            year={movie.year}
            image={movie.image}
            rating={movie.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
