import './globals.css';
import type { Metadata } from "next";
import { Providers } from './providers';
import { evelethClean } from './fonts';

export const metadata: Metadata = {
  title: "Dagger Hub",
  description: "Homebrew DaggerHeart Content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={evelethClean.variable}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
