import { auth } from "../auth";
import Image from "next/image";
import movie from "../images/icons8-movies-24.png";
import { SignOut } from "./logout-button";

export default async function Header() {
    const session = await auth();

    if (!session?.user?.email) return null;

    return (
        <main className="bg-teal-300">
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Image src={movie} alt="movie log" className="w-6 h-6" />
                    <span className="text-blue-900 font-extrabold text-xl tracking-wide">Cinema Guru</span>
                </div>
                <div className="text-blue-900 flex items-center space-x-4">
                    <span>Welcome, {session?.user?.email}</span>
                    <span><SignOut /></span>
                </div>
            </div>
        </main>
    )
}