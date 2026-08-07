import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/content/site.config";
import { Providers } from "@/components/layout/Providers";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

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

const title = `${site.name} | Software Engineer`;
const description = site.subheadline;

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description,
  keywords: [
    "software engineer",
    "backend engineer",
    "new grad 2027",
    "Kafka",
    "Spring Boot",
    "Go",
    "LLM evaluation",
    "Ottawa",
  ],
  authors: [{ name: site.name, url: site.siteUrl }],
  openGraph: {
    title,
    description,
    url: site.siteUrl,
    siteName: site.name,
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  email: `mailto:${site.email}`,
  url: site.siteUrl,
  jobTitle: "Software Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: site.education.school,
  },
  sameAs: site.socials.map((s) => s.url),
  address: { "@type": "PostalAddress", addressLocality: "Ottawa", addressCountry: "CA" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Providers>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
