import PageContainer from "@/layout/PageContainer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PageContainer>
        <Component {...pageProps} />;
      </PageContainer>
    </>
  );
}
