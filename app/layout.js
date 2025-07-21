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
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="min-h-screen bg-gradient-to-br from-blue-50/10 via-white/5 to-purple-50/10">
          {children}
        </div>
      </body>
    </html>
  );
}
