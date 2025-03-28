import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToastNotifier from "@/components/ui/ToastNotifier";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IntenX - AI-Powered Cross-Chain Trading",
  description: "Automated AI-driven portfolio rebalancing & trading powered by NEAR Intents and Bitte.ai.",
  icons: { icon: "/logo.png" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0D0D12] text-white flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class">
          <ToastNotifier />
          <AuthProvider>
            <Header />
            <main className="flex-grow">{children}</main> {/* Pushes footer down */}
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
