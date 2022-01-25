import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
