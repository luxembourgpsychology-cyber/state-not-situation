import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-dvh grid place-items-center">
        <main className="text-center px-6">
          <p className="eyebrow eyebrow-red mb-4">404</p>
          <h1 className="serif-title text-4xl mb-6">Nothing is here.</h1>
          <Link href="/en" className="btn">State. Not Situation.</Link>
        </main>
      </body>
    </html>
  );
}
