import "./globals.css";
import Head from "next/head";


export const metadata = {
  title: "SSWT",
  description: "Super Simple Workout Tracker PWA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <body className="bg-blue-300">
        {children}
      </body>
    </html>
  );
}
