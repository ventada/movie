import axios from "axios";

const API_HOST = "imdb236.p.rapidapi.com";
const API_KEY = "2ba667b1f2msh73661dfc3dcc28cp13775cjsn52bde160aef0";

const apiClient = axios.create({
  headers: {
    "x-rapidapi-host": API_HOST,
    "x-rapidapi-key": API_KEY,
  },
});

export interface Movie {
  id: string;
  title: string;
  year: string;
  image: string;
  rating?: string;
  description?: string;
}

export const getTopMovies = async (): Promise<Movie[]> => {
  try {
    const response = await apiClient.get(
      "https://imdb236.p.rapidapi.com/imdb/top250-movies"
    );

    // Transform the API response to our Movie interface
    return response.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      year: item.year,
      image: item.image,
      rating: item.rating,
    }));
  } catch (error) {
    console.error("Error fetching top movies:", error);
    return [];
  }
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await apiClient.get(
      "https://imdb236.p.rapidapi.com/imdb/most-popular-movies"
    );

    // Transform the API response to our Movie interface
    return response.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      year: item.year,
      image: item.image,
      rating: item.rating,
    }));
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await apiClient.get(
      `https://imdb236.p.rapidapi.com/imdb/autocomplete?query=${encodeURIComponent(
        query
      )}`
    );

    // Transform the API response to our Movie interface
    return response.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      year: item.year || "",
      image: item.image || "/placeholder-movie.jpg",
    }));
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

export const getMovieDetails = async (id: string) => {
  try {
    const response = await apiClient.get(
      `https://imdb236.p.rapidapi.com/imdb/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ${id}:`, error);
    return null;
  }
};

// Mock data for development (in case API calls fail or for testing)
export const getMockMovies = (): Movie[] => [
  {
    id: "tt0111161",
    title: "The Shawshank Redemption",
    year: "1994",
    image:
      "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    rating: "9.3",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: "tt0068646",
    title: "The Godfather",
    year: "1972",
    image:
      "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    rating: "9.2",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    id: "tt0468569",
    title: "The Dark Knight",
    year: "2008",
    image:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    rating: "9.0",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    id: "tt0167260",
    title: "The Lord of the Rings: The Return of the King",
    year: "2003",
    image:
      "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    rating: "9.0",
    description:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
  },
  {
    id: "tt0109830",
    title: "Forrest Gump",
    year: "1994",
    image:
      "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    rating: "8.8",
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
  },
];

export const getMockHeroMovies = (): Movie[] => [
  {
    id: "tt1375666",
    title: "Inception",
    year: "2010",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    rating: "8.8",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  },
  {
    id: "tt0816692",
    title: "Interstellar",
    year: "2014",
    image:
      "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    rating: "8.6",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: "tt0133093",
    title: "The Matrix",
    year: "1999",
    image:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    rating: "8.7",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
];
