import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <div>
        <label htmlFor="status-update">post a status update here</label>
        <input name="status-update" placeholder="type here" />
      </div>
      <p>main page here</p>
      <Link href="/profile" className="border-2 border-solid border-black">
        Navigate to Profile Page
      </Link>
    </div>
  );
}
