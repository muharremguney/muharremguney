import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BackgroundFX } from "@/components/ui/BackgroundFX";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { profile } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

const siteUrl = "https://muharremguney.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | ${profile.title}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.heroTagline,
  keywords: [
    "Muharrem Güney",
    "IT Support Specialist",
    "Bilişim",
    "Portföy",
    "Özgeçmiş",
    "BT Uzmanı",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    title: `${profile.name} | ${profile.title}`,
    description: profile.heroTagline,
    siteName: profile.name,
  },
  twitter: {
    card: "summary",
    title: `${profile.name} | ${profile.title}`,
    description: profile.heroTagline,
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark")}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="h-dvh overflow-hidden font-sans antialiased">
        <BackgroundFX />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
