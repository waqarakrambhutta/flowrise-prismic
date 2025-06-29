import type { Metadata, ResolvedMetadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { createClient } from "@/prismicio";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const page = await client.getSingle("static_zone");

  return {
    title: page.data.site_title || "Flowrise fallback",
    description:
      page.data.meta_description ||
      "Flowrise is the best way to find your interest.",
    openGraph: {
      images: page.data.og_image.url || "",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${clsx(
          nunito.variable,
          nunitoSans.variable
        )}  antialiased bg-transparent`}
      >
        <header>Header</header>
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}
