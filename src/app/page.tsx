import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <p>main page here</p>
      <Link href="/profile" className="border-2 border-solid border-black">
        Navigate to Profile Page
      </Link>
    </div>
  );
}
