import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export default function AdminLayout({ children }) {
    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />

                <main className="p-4 flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};