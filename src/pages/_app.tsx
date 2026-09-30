import UserNavbar from "@/components/navbar/UserNavbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextFont } from "next/dist/compiled/@next/font";
import { Roboto } from "next/font/google";

const roboto: NextFont = Roboto({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <UserNavbar />
      <Component {...pageProps} />
    </main>
  );
}
