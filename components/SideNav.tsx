"use client";
import Image from "next/image";
import Link from "next/link";
import home from "../images/icons8-folder-16.png";
import favorite from "../images/icons8-star-16.png";
import watchLater from "../images/icons8-clock-16.png";

export default function SideNav() {

  return (
    <div className="bg-teal-500 fixed top-[60px] left-0 h-full px-6 py-4 flex flex-col items-start space-y-4 group">
        <Link href="/" className="flex items-center space-x-2">
                <Image src={home} alt="Home Folder" className="w-6 h-6" />
                <span className="text-gray-50 hidden group-hover:inline-block">Home</span>
        </Link>
        <Link href="/dashboard/favorite" className="flex items-center space-x-2">
                <Image src={favorite} alt="Favorite" className="w-6 h-6" />
                <span className="text-gray-50 hidden group-hover:inline-block">Favorite</span>
        </Link>
        <Link href="/dashboard/watchLater" className="flex items-center space-x-2">
                <Image src={watchLater} alt="Watch Later" className="w-5 h-5" />
                <span className="text-gray-50 hidden group-hover:inline-block">Watch Later</span>
        </Link>
    </div>
  );
}
