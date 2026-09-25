import "@/app/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export const metadata = {
    title: "Product Admin Dashboard",
    description: "Manage products using DummyJSON API",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gray-10 min-h-screen text-gray-90 antialiased">
                <AuthProvider>
                    <Navbar />
                    <main>{children}</main>
                </AuthProvider>
            </body>
        </html>
    );
}