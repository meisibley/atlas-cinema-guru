import { signOut } from "@/auth";
import logOut from "@/images/icons8-logout-16.png";
import Image from "next/image";

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <button type="submit" className="flex items-center space-x-2">
                <Image src={logOut} alt="logout button" className="w-3 h-4"/>
                <span>Logout</span>
            </button>
        </form>
    )
}