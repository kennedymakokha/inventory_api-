// components/Sidebar.tsx
"use client";
import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="hidden md:flex md:flex-col w-64 bg-slate-900 border-r">
            <div className="p-4 font-bold text-lg">Admin</div>
            <nav className="flex flex-col gap-2 p-4">
                <Link href="/dashboard" className="hover:text-slate-900 hover:bg-gray-100 p-2 rounded">Dashboard</Link>
                <Link href="/dashboard/users" className="hover:text-slate-900 hover:bg-gray-100 p-2 rounded">Users</Link>
                <Link href="/dashboard/settings" className="hover:text-slate-900 hover:bg-gray-100 p-2 rounded">Settings</Link>
            </nav>
        </div>
    );
}
