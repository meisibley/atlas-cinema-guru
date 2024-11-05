import Header from "@/components/Header";
import HomePage from "@/app/dashboard/home/old-page";
import SideNav from "@/components/SideNav";
import Link from "next/link";
import { fetchTitles } from "@/lib/data";

export default async function Page() {
  let page = 1;
  let minYear = 0;
  let maxYear = 2024;
  let query = "";
  let genres: string[] = ["Romance", "Horror", "Drama", "Action", "Mystery", "Fantasy", "Thriller", "Western", "Sci-Fi", "Adventure"];
  let userEmail = "fdgfdg@hgdhdh.com";
  let hasMoreData = true;

  const allTitles = [];

  while (hasMoreData) {
    const titles = await fetchTitles(page, minYear, maxYear, query, genres, userEmail);
    allTitles.push(...titles);
    if (titles.length === 0) {
      hasMoreData = false;
    } else {
      page += 1;
    }
  }

  return (
    <Link href={"/"} className="h-screen">
      <div className="flex justify-between ml-16 text-gray-100 font-normal">
        <div>
          <p>Search</p>
          <input type="text" name="name" placeholder="  Search Movies..."
              className="bg-inherit rounded-full border-2 border-teal-300 mt-2 w-72 h-8"
          />
          <div className="flex justify-between mt-3">
            <div className="block">
              <p>Min Year</p>
              <input type="text" name="" placeholder=" 1990"
                className="bg-inherit rounded-full border-2 border-teal-300 mt-2 w-24 h-8"
              />
            </div>
            <div className="block">
              <p>Max Year</p>
              <input type="text" name="" placeholder=" 2024"
                className="bg-inherit rounded-full border-2 border-teal-300 mt-2 w-24 h-8"
              />
            </div>
          </div>
        </div>
        <div>
          <p>Genres</p>
          <div className="flex justify-between text-center text-gray-100 mt-2">
            <button className="flex text-center bg-inherit rounded-full border-2 border-teal-300 w-20 h-8">Romance</button>
            <button className="flex text-center bg-inherit rounded-full border-2 border-teal-300 ml-1 w-16 h-8">Horror</button>
            <button className="flex text-center bg-inherit rounded-full border-2 border-teal-300 ml-1 w-16 h-8">Drama</button>
            <button className="flex text-center bg-inherit rounded-full border-2 border-teal-300 ml-1 w-16 h-8">Action</button>
            <button className="flex text-center bg-inherit rounded-full border-2 border-teal-300 ml-1 w-20 h-8">Mystery</button>
          </div>
          <div className="flex justify-between mt-2">
            <button className="flex text-center bg-inherit rounded-full border-2 border-teal-300 w-20 h-8">Fantasy</button>
            <button className="flex text-center bg-inherit rounded-full border-2 border-teal-300 ml-1 w-20 h-8">Thriller</button>
            <button className="flex text-center bg-inherit rounded-full border-2 border-teal-300 ml-1 w-20 h-8">Western</button>
            <button className="flex text-center bg-inherit rounded-full border-2 border-teal-300 ml-1 w-14 h-8">Sci-Fi</button>
            <button className="flex text-center bg-inherit rounded-full border-2 border-teal-300 ml-1 w-24 h-8">Adventure</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 ml-16">
        {allTitles.map((title) => (
          <div key={title.id} className="p-4">
            <img src={title.image} alt={title.title} className="border-2 border-teal-300 w-full object-cover rounded-xl mb-2" />
            {/* <h2 className="text-lg font-semibold">{title.title}</h2>
            <p>Genre: {title.genre}</p> */}
            {/* {title.favorited && <p>🌟 Favorited</p>}
            {title.watchLater && <p>⏳ Watch Later</p>} */}
          </div>
        ))}
      </div>
    </Link>
  );
}
