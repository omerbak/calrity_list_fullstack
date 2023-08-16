import "./globals.css";
import { Proza_Libre, Roboto } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import Nav from "@/components/nav/Nav";
import "remixicon/fonts/remixicon.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const proza = Proza_Libre({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Clarity list",
  description: "See your goals clearly, acheive them easily!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={proza.className}>
        <div className="container">
          <AuthProvider>
            <Nav />
            {children}
          </AuthProvider>
        </div>
        <ToastContainer autoClose={2000} />
      </body>
    </html>
  );
}
