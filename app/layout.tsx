import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Renewed Minds International | Build. Inspire. Influence.",
  description:
    "Renewed Minds International is a Kingdom organization with a God-given mandate to build, inspire, and positively influence young minds to know Jesus and impact their world for good.",
  keywords:
    "Renewed Minds International, RMI, youth ministry, Christian organization, Federal University Wukari, kingdom impact",
  openGraph: {
    title: "Renewed Minds International",
    description:
      "Build. Inspire. Influence. — Igniting revival and unleashing kingdom impact one young life at a time.",
    images: ["/logo/logo.jpeg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo/logo.jpeg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
