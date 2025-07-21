import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ConditionalHeader from "@/components/layout/ConditionalHeader";
import ConditionalFooter from "@/components/layout/ConditionalFooter";

const IBMPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-IBMPlexSans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const IBMPlexMono = IBM_Plex_Mono({
  variable: "--font-IBMPlexMono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "mocodes",
    template: "%s | mocodes",
  },
  description:
    "mocodes is a portfolio where I share my coding journey, tutorials, and insights on web development.",
  icons: {
    icon: "/web-app-manifest-512x512.png",
  },
  openGraph: {
    title: "mocodes",
    description:
      "mocodes is a portfolio where I share my coding journey, tutorials, and insights on web development.",
    url: "https://mocodes.blog",
    siteName: "mocodes",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 800,
        height: 420,
        alt: "mocodes Open Graph Image",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://mocodes.blog"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${IBMPlexSansArabic.variable} ${IBMPlexMono.variable} `}
      >
        <Providers>
          <ConditionalHeader />
          <main>{children}</main>
          <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}
