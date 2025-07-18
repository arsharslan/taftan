import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/headers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /*   return (
      <html lang="en" className="h-full bg-gray-900">
        <BackgroundImage
          placeholder={""}
          src={"/images/hero-slider-1.jpg"}
        >
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
          >
            <Header />
            {children}
          </body>
        </BackgroundImage>
      </html>
    ); */

  return (<html lang="en" className="h-full bg-gray-900 w-full bg-cover bg-center bg-no-repeat bg-fixed"
    style={{ backgroundImage: `url('/images/hero-slider-1.jpg')`, minHeight: "100vh" }}
  >
    <body className={`${geistSans.variable} ${geistMono.variable}  antialiased h-full `}
    >
      <Header />
      <div className="min-h-screen bg-transparent">
        {children}
      </div>
    </body>
  </html>);
}
