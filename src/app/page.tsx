import Link from "next/link";
import StatusUpdate from "../components/main-page/StatusUpdate";
import RecentFeed from '../components/main-page/RecentFeed';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full gap-2">
      <StatusUpdate />
      <RecentFeed />
      <p>main page here</p>
      <Link href="/profile" className="border-2 border-solid border-black">
        Navigate to Profile Page
      </Link>
    </div>
  );
}
