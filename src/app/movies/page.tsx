import Link from "next/link";
import Image from "next/image";

export default function MoviesPage() {
  // Movie categories with their routes and descriptions
  const categories = [
    {
      title: "Top 250 Movies",
      description: "The top rated movies of all time as voted by IMDb users",
      route: "/movies/top250",
      bgColor: "from-blue-500 to-purple-600",
    },
    {
      title: "Most Popular Movies",
      description: "The most popular movies currently trending on IMDb",
      route: "/movies/popular",
      bgColor: "from-red-500 to-orange-500",
    },
    {
      title: "Top Box Office",
      description:
        "Movies that are currently performing well at the box office",
      route: "/movies/box-office",
      bgColor: "from-green-500 to-teal-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Explore Movies
          </h1>
          <p className="mt-6 text-xl max-w-3xl">
            Discover the best movies across different categories. From all-time
            classics to the latest box office hits.
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link key={index} href={category.route} className="block group">
              <div className="relative h-64 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:shadow-xl group-hover:scale-105">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${category.bgColor} opacity-90`}
                ></div>
                <div className="relative p-6 flex flex-col h-full justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {category.title}
                    </h2>
                    <p className="text-white text-opacity-90">
                      {category.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <span className="inline-flex items-center text-white font-medium">
                      Explore
                      <svg
                        className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
