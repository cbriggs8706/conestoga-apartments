import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title: "Conestoga Apartments | 2 & 3 Bedroom Apartments in Rupert, Idaho",
 description: "Find your home at Conestoga Apartments in Rupert, Idaho. Two- and three-bedroom apartments with two bathrooms, from $1,200/month. Pet friendly for pets 15 lbs or less. Located at 1120 Wagon Wheel Drive, behind Minidoka Hospital. Call for an application.",
 openGraph: { title: "Conestoga Apartments · Rupert, Idaho", description: "A little more space. A lot more home. Explore our two- and three-bedroom apartments.", images: [{url: "/images/ai-enhanced-v1/house2.webp", width:1855,height:848}] },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
