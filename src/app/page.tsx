import Link from "next/link";
import StatusUpdate from "../components/StatusUpdate";
import RecentFeed from "./components/RecentFeed";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col gap-2">
      <StatusUpdate />
      <RecentFeed />
      <p>main page here</p>
      <Link href="/profile" className="border-2 border-solid border-black">
        Navigate to Profile Page
      </Link>
    </div>
  );
}
