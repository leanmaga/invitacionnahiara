import "./globals.css";
import {
  Inter,
  Playfair_Display,
  Cookie,
  Dancing_Script,
} from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});
const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-elegant",
});
const coockie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-coockie",
});

// Variable de entorno para el nombre de la quinceañera
const nombreQuinceanera =
  process.env.NEXT_PUBLIC_NOMBRE_QUINCEANERA || "Quinceañera";

export const metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PRODUCTION_URL ||
        "https://invitacion-quinceañera.vercel.app"
      : "http://localhost:3000"
  ),

  title: `${nombreQuinceanera} - Mis 16 Años`,
  description: "Una celebración única",

  // Meta tags para redes sociales
  openGraph: {
    title: `${nombreQuinceanera} - Mis 16 Años`,
    description: "Una celebración única",
    url: "/", // Ahora es relativo a metadataBase
    siteName: `16 de ${nombreQuinceanera}`,
    images: [
      {
        url: "/favicon.ico", // Relativo a metadataBase
        width: 32,
        height: 32,
        alt: `${nombreQuinceanera} - Mis 16 Años`,
      },
    ],
    locale: "es_ES",
    type: "website",
  },

  // Twitter Cards
  twitter: {
    card: "summary",
    title: `${nombreQuinceanera} - Mis 16 Años`,
    description: "Una celebración única",
    images: ["/favicon.ico"], // Relativo a metadataBase
  },

  // Meta tags adicionales
  robots: {
    index: true,
    follow: true,
  },

  // Favicons y iconos
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // Manifest
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${dancing.variable} ${coockie.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* Meta tags adicionales para mejor SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="author" content={nombreQuinceanera} />
        <meta
          name="keywords"
          content={`16, ${nombreQuinceanera.toLowerCase()}, 16 años, celebración, fiesta`}
        />

        {/* Preload de recursos importantes */}
        <link rel="preload" href="/favicon.ico" as="image" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
