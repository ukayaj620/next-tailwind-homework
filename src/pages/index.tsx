import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col p-4 ${inter.className}`}>
      <h1 className="text-2xl font-semibold">
        List of Jay&apos;s Programming Class Homework
      </h1>
      <div className="mt-8 flex flex-col gap-y-6">
        <Link
          className="text-blue-700 hover:underline hover:text-blue-800"
          href="/register-form"
        >
          Register Form
        </Link>
        <Link
          className="text-blue-700 hover:underline hover:text-blue-800"
          href="/todo"
        >
          Todo Form
        </Link>
      </div>
    </main>
  );
}
