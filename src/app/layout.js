import Navbar from "@/components/Navbar";
import "./globals.css";
import Providers from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "BookChimp — Your favourite books, all in one place",
  description: "Discover, explore and shop thousands of books across every genre.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <Providers>
          <Navbar/>
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="colored"
          />
        </Providers>
      </body>
    </html>
  );
}
