import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "What's Your Cortisol Level? | cortisollevel.xyz",
  description:
    "Take the 30-second cortisol personality test. Find out your stress type and share your results. The internet's favorite cortisol meme quiz.",
  keywords: [
    "cortisol level",
    "cortisol meme",
    "low cortisol",
    "cortisol test",
    "cortisol personality",
    "stress quiz",
    "low cortisol meme",
  ],
  openGraph: {
    title: "What's Your Cortisol Level?",
    description:
      "Take the 30-second cortisol personality test the internet is obsessing over.",
    url: "https://cortisollevel.xyz",
    siteName: "cortisollevel.xyz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What's Your Cortisol Level?",
    description: "Take the 30-second cortisol personality test.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh flex flex-col antialiased">
        <main className="flex-1">{children}</main>
        <footer className="text-center py-6 px-4 text-muted text-xs border-t border-border">
          <p>
            This is an entertainment quiz, not medical advice. For health
            concerns, consult a healthcare professional.
          </p>
          <p className="mt-1 opacity-60">
            cortisollevel.xyz &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </body>
    </html>
  );
}
