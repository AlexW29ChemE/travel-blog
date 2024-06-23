import { Metadata } from "next";
import Footer from "./components/Footer";
import './globals.css';
import { Inter } from "next/font/google";
import Header from "./components/Header";


const inter = Inter({ subsets: ["latin"] });
export const metadata:Metadata = {
  title: "Alex's Travel Log",
  description: "A log of Alex's Travels",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Header isLoggedIn={true} />
      <div className="min-h-screen">{children}</div>
      <Footer/>
      </body>
    </html>
  );
}

