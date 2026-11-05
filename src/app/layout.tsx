import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title: "Conestoga Apartments | Two-Bedroom Apartments in Rupert, Idaho",
 description: "Find your home at Conestoga Apartments in Rupert, Idaho. Two bedrooms, two bathrooms, 980 square feet and two floors. Call to ask about availability and schedule a tour.",
 openGraph: { title: "Conestoga Apartments · Rupert, Idaho", description: "A little more space. A lot more home. Explore our two-bedroom apartments.", images: [{url: "/images/house2.webp", width:1970,height:900}] },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
