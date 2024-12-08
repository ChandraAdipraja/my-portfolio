import SplashScreen from "@/components/ui/SplashScreen";
import PageContainer from "@/layout/PageContainer";
import localFont from "next/font/local";
import { HomePage } from "./features/Home/HomePage";

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

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
