"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import favoriteIcon from "@/images/icons8-star-16.png";
import watchLaterIcon from "@/images/icons8-clock-16.png";

interface Favorite {
  id: string;
  image: string;
  title: string;
  synopsis: string;
  genre: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);

  const fetchFavorites = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/favorites?page=${page}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch favorites. Status: ${response.status}`);
      }
      const data = await response.json();
      setFavorites(data.favorites);
      setHasMorePages(data.favorites.length > 0);
    } catch (error: any) {
      setError(error.message);
      setHasMorePages(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (hasMorePages) {
        setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (loading) return <div className="ml-20">Loading...</div>;
  if (error) return <div className="ml-20">Error: {error}</div>;

  return (
    <Link href={"/dashboard/favorite"} className="h-screen">
      <h1 className="flex justify-center text-4xl font-extrabold p-4">Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-8 mt-4 ml-16">
        {favorites.map((favorite) => (
          <div key={favorite.id} className="relative p-4 group">
            <img
              src={favorite.image}
              alt={favorite.title}
              className="border-2 border-teal-300 w-full object-cover rounded-xl mb-2"
            />
            {/* Favorite and Watch Later icons */}
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button className="p-1">
                <Image src={favoriteIcon} alt="Favorite" className="w-6 h-6" />
              </button>
              <button className="p-1">
                <Image src={watchLaterIcon} alt="Watch Later" className="w-6 h-6" />
              </button>
            </div>
            {/* Movie Details */}
            <div className="absolute right-5 left-5 bottom-7 bg-blue-900 bg-opacity-90 p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p className="text-white text-lg font-bold">{favorite.title}</p>
              <p className="text-white text-sm mt-1">{favorite.synopsis}</p>
              <p className="text-white text-xs mt-2 bg-teal-500 rounded-full px-2 py-1 inline-block">
                {favorite.genre}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Buttons */}
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
          disabled={!hasMorePages}
        >
          Next
        </button>
      </div>
    </Link>
  );
}
