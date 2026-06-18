"use client";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="booklight"
      themes={["booklight", "bookdark"]}
      enableSystem={false}
    >
      {children}
    </ThemeProvider>
  );
}
