"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import home from "../images/icons8-folder-16.png";
import favorite from "../images/icons8-star-16.png";
import watchLater from "../images/icons8-clock-16.png";

interface Activity {
        id: string;
        title: string;
        activity: "FAVORITED" | "WATCH_LATER";
        timestamp: string;
}

export default function SideNav() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activities?page=1");
        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }
        const data = await response.json();
        setActivities(data.activities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
        useEffect(() => {
          
          fetchActivities();
    }, []);

  return (
    <div onMouseOver={fetchActivities} className="bg-teal-500 fixed top-[60px] left-0 h-full px-6 py-4 flex flex-col items-start space-y-4 group z-[1000]">
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
        <div className="bg-teal-300 text-blue-950 rounded-xl p-2 mt-6 w-40 hidden group-hover:inline-block">
            <h2 className="flex justify-center text-center font-semibold my-2">Latest Activities</h2>
            <div className="space-y-3">
                {activities.length > 0 ? (
                    activities.map((activity) => (
                        <div key={activity.id} className="flex flex-col text-blue-950 text-sm">
                            <p>{new Date(activity.timestamp).toLocaleDateString()}{" "}
                            {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            {activity.activity === "FAVORITED" ? (
                                <p>Favorited <span className="font-semibold max-w-44">{activity.title}</span></p>
                            ) : (
                                    <p>Added <span className="font-semibold max-w-44">{activity.title}</span> to Watch Later</p>
                                )}
                        </div>
                    ))
                ) : (
                        <p className="text-blue-950 text-xs">No recent activity.</p>
                )}
            </div>
        </div>
    </div>
  );
}
