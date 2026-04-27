import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { SettingsProvider } from "@/lib/settings-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "new-portfolio | Bekam Genene",
  description:
    "AI Engineer and Full Stack Developer specializing in machine learning, web development, and building intelligent digital solutions.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Full Stack Developer",
    "Python",
    "React",
    "Next.js",
    "TensorFlow",
    "Web Development",
  ],
  authors: [{ name: "Bekam Genene" }],
  creator: "Bekam Genene",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bekam-portfolio.vercel.app",
    title: "new-portfolio | Bekam Genene",
    description:
      "AI Engineer and Full Stack Developer specializing in machine learning and web development.",
    siteName: "new-portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "new-portfolio | Bekam Genene",
    description:
      "AI Engineer and Full Stack Developer specializing in machine learning and web development.",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SettingsProvider>{children}</SettingsProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
