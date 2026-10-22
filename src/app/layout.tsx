import type { Metadata } from "next";
import { Noto_Sans_JP, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PORTFOLIO | 文学 × マーケティングでマンガを世界へ",
  description:
    "日本文学の読解力とフランスで培った国際マーケティングを強みに、マンガの魅力とビジネスを繋ぐポートフォリオサイト。『スキップとローファー』への想いを込めて。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${plusJakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FAF7F2] text-[#242D35] font-sans antialiased selection:bg-[#FCE182] selection:text-[#1A202C]">
        {children}
      </body>
    </html>
  );
}
