import StatusUpdate from "../components/StatusUpdate";
import RecentFeed from "../containers/main-page/RecentFeed";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col gap-2">
      <StatusUpdate />
      <RecentFeed />
      <div className="text-header-font">swims this week</div>
      <div className="text-header-font">Journey progress</div>
      <div className="text-header-font">latest activity</div>
    </div>
  );
}
