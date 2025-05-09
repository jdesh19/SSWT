import "./globals.css";


export const metadata = {
  title: "SSWT",
  description: "Super Simple Workout Tracker PWA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-blue-300">
        {children}
      </body>
    </html>
  );
}
