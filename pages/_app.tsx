import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { Montserrat } from "@next/font/google";

const font = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={font.variable}>
      <Component {...pageProps} />
    </main>
  );
}
