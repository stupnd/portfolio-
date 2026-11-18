import type { Metadata } from "next";
import { Instrument_Serif, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site.config";
import { Providers } from "@/components/layout/Providers";
import { Masthead } from "@/components/issue/Masthead";

// Instrument Serif sets the cover and the headlines, Source Serif 4 the
// reading text, JetBrains Mono only folios, figure labels and data.
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});
const text = Source_Serif_4({
  subsets: ["latin"],
  weight: "400",
  // The real italic, for captions and the colophon note: no synthesized slant
  style: ["normal", "italic"],
  variable: "--font-text",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

const title = `${site.name} | ${site.issue.coverLine}`;
const description = `${site.issue.coverLine} ${site.issue.dek}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description,
  keywords: [
    "applied AI engineer",
    "backend engineer",
    "LLM evaluation",
    "RAG",
    "new grad 2027",
    "Kafka",
    "Spring Boot",
    "Go",
    "distributed systems",
    "Kubernetes",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${text.variable} ${mono.variable} font-serif antialiased`}>
        {/* Mockup only: ?plate=blue previews the ink-blue spot colour. Removed once a plate is chosen. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(new URLSearchParams(location.search).get("plate")==="blue")document.documentElement.dataset.accent="blue"`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Skip to content
        </a>
        <Providers>
          <Masthead />
          <main id="main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
