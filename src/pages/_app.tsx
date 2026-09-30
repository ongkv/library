import UserNavbar from "@/components/navbar/UserNavbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextFont } from "next/dist/compiled/@next/font";
import { Roboto } from "next/font/google";
import Head from "next/head";

const roboto: NextFont = Roboto({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Library</title>
        <meta name="description" content="Library web app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={roboto.className}>
        <UserNavbar />
        <Component {...pageProps} />
      </main>
    </>
  );
}
