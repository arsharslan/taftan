import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/headers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Taftan",
  description: "Taftan Online Ordering App",
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
            className={`${dmSans.variable} antialiased h-full`}
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
    <body className={`${dmSans.variable} font-sans antialiased h-full`}
    >
      <Header />
      <div className="min-h-screen bg-transparent">
        {children}
      </div>
    </body>
  </html>);
}
