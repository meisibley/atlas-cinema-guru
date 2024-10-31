"use client"

import { useState } from "react";
import Image from "next/image";
import home from "../images/icons8-folder-16.png";
import favorit from "../images/icons8-star-16.png";
import watchLater from "../images/icons8-clock-16.png";

export default function SideNav() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="bg-teal-500 fixed top-15 left-0 h-full px-6 py-4 flex flex-col items-start space-y-4 group">
        <button
                // type="submit"
                type="button"
                className="flex items-center space-x-2"
                onClick={() => setActive("act")}
        >
                <Image src={home} alt="Home Folder" className="w-6 h-6" />
                <span className={`text-gray-50 ${active === "act" ? "inline-block" : "hidden group-hover:inline-block"}`}>Home</span>
        </button>
        <button type="button"
                className="flex items-center space-x-2"
                onClick={() => setActive("act")}
        >
                <Image src={favorit} alt="Favorit" className="w-6 h-6" />
                <span className={`text-gray-50 ${active === "act" ? "inline-block" : "hidden group-hover:inline-block"}`}>Favorit</span>
        </button>
        <button type="button"
                className="flex items-center space-x-2"
                onClick={() => setActive("act")}
        >
                <Image src={watchLater} alt="Watch Later" className="w-5 h-5"/>
                <span className={`text-gray-50 ${active === "act" ? "inline-block" : "hidden group-hover:inline-block"}`}>Watch Later</span>
        </button>
    </div>
  )
}
