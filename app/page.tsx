"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import favoritedIcon from "../images/icons8-star-16.png";
import favoriteIcon from "../images/icons8-star-em.png";
import watchLaterIcon from "../images/icons8-clock-em.png";
import watchLateredIcon from "../images/icons8-clock-16.png";

interface Title {
  id: string;
  image: string;
  title: string;
  synopsis: string;
  genre: string;
  favorited: boolean;
  watchLater: boolean;
}

export default function HomePage() {
  const [titles, setTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [minYear, setMinYear] = useState(1990);
  const [maxYear, setMaxYear] = useState(2024);
  const [hasMore, setHasMore] = useState(true);

  const genresList = [
    "Romance", "Horror", "Drama", "Action", "Mystery",
    "Fantasy", "Thriller", "Western", "Sci-Fi", "Adventure"
  ];
  const [selectedGenres, setSelectedGenres] = useState<string[]>(genresList);

  const pageSize = 10;

  const fetchTitles = async (page: number, minYear: number, maxYear: number, query = "", genres: string[]) => {
    try {
      setLoading(true);
      const genreQuery = genres.join(",");
      const response = await fetch(
        `/api/titles?page=${page}&minYear=${minYear}&maxYear=${maxYear}&query=${query}&genres=${genreQuery}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch titles.");
      }
      const data = await response.json();
      setTitles(data.title.map((title: any) => ({ ...title })));
      setHasMore(data.title.length > 0 && data.title.length === titles.length);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTitles(currentPage, minYear, maxYear, searchQuery, selectedGenres);
  }, [currentPage, minYear, maxYear, searchQuery, selectedGenres]);

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCurrentPage(1);
    fetchTitles(1, minYear, maxYear, searchQuery, selectedGenres);
  };

  const handleSearchInputChange = (event:
    React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleMinYearChange = (event:
    React.ChangeEvent<HTMLInputElement>) => {
      setMinYear(Number(event.target.value) || 1990);
  };

  const handleMaxYearChange = (event:
    React.ChangeEvent<HTMLInputElement>) => {
      setMaxYear(Number(event.target.value) || 2024);
  };

  const toggleFavorite = async (id: string) => {
    const favoriteStatus = titles.find((title) => title.id === id)?.favorited;

    try {
      if (favoriteStatus) {
        await fetch(`/api/favorites/${id}`, { method: "DELETE" });
      } else {
        await fetch(`/api/favorites/${id}`, { method: "POST" });
      }

      setTitles((prevTitles) =>
        prevTitles.map((title) =>
          title.id === id ? { ...title, favorited: !favoriteStatus } : title
        )
      );
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };

  const toggleWatchLater = async (id: string) => {
    const watchLaterStatus = titles.find((title) => title.id === id)?.watchLater;

    try {
      if (watchLaterStatus) {
        await fetch(`/api/watch-later/${id}`, { method: "DELETE" });
      } else {
        await fetch(`/api/watch-later/${id}`, { method: "POST" });
      }

      setTitles((prevTitles) =>
        prevTitles.map((title) =>
          title.id === id ? { ...title, watchLater: !watchLaterStatus } : title
        )
      );
    } catch (error) {
      console.error("Failed to update watch later:", error);
    }
  };

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  if (loading) return <div className="ml-20">Loading...</div>;
  if (error) return <div className="ml-20">Error: {error}</div>;

  return (
    <div className="h-screen">
      <div className="flex justify-between ml-20 text-gray-100 font-normal">
        <div>
          <form onSubmit={handleSearchSubmit}>
            <p>Search</p>
            <input type="text" placeholder="Search Movies..." value={searchQuery} onChange={handleSearchInputChange}
                className="bg-inherit rounded-full border-2 border-teal-300 pl-1 mt-2 w-72 h-8"
            />

          <div className="flex justify-between mt-3">
            <div className="block">
              <p>Min Year</p>
              <input type="number" placeholder="1990" value={minYear} onChange={handleMinYearChange}
                className="bg-inherit rounded-full border-2 border-teal-300 p-1 mt-2 w-24 h-8"
              />
            </div>
            <div className="block">
              <p>Max Year</p>
              <input type="number" placeholder="2024" value={maxYear} onChange={handleMaxYearChange}
                className="bg-inherit rounded-full border-2 border-teal-300 p-1 mt-2 w-24 h-8"
              />
            </div>
          </div>
          </form>
        </div>
          <div className="w-82 flex flex-col items-center space-y-1 text-gray-100 mt-2 ml-auto mr-4">
          <p className="self-start text-white">Genres</p>
          <div className="grid grid-cols-5 gap-2">
            {genresList.map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreToggle(genre)}
                className={`bg-inherit rounded-full border-2 border-teal-300 px-2 w-full h-8 ${
                  selectedGenres.includes(genre) ? "bg-teal-300 text-blue-900" : ""
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-0 mt-2 ml-16">
        {titles.map((title) => (
          <div key={title.id} className="relative p-4 group">
            <img
              src={title.image}
              alt={title.title}
              className="border-2 border-teal-300 w-full object-cover rounded-xl mb-1"
            />
            {/* Favorite and Watch Later icons */}
            <div className="absolute top-6 right-6 flex space-x-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button className="p-1" onClick={() => toggleFavorite(title.id)}>
                <Image src={title.favorited ? favoritedIcon : favoriteIcon} alt="Favorite" className="w-6 h-6" />
              </button>
              <button className="p-1" onClick={() => toggleWatchLater(title.id)}>
                <Image src={title.watchLater ? watchLateredIcon : watchLaterIcon} alt="Watch Later" className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute right-5 left-5 bottom-6 bg-blue-700 bg-opacity-90 p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p className="text-white text-lg">{title.title}</p>
              <p className="text-white text-sm mt-1">{title.synopsis}</p>
              <p className="text-white text-sm mt-2 bg-teal-500 rounded-full px-2 py-1 inline-block">{title.genre}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={handlePreviousPage}
          className="px-4 py-2 rounded-l-full bg-teal-500 text-lg font-medium text-blue-900 w-36 h-14"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 rounded-r-full bg-teal-500 text-lg font-medium text-blue-900 w-36"
          disabled={!hasMore}
        >
          Next
        </button>
      </div>
    </div>
  );
}
