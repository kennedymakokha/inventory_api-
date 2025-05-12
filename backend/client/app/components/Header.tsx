'use client';


import { useState } from 'react';

export default function Header() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <header className="flex items-center justify-between p-4 bg-slate-900 border-b shadow-sm">
            {/* Left: Mobile toggle */}
            <button
                className="md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="  text-gray-600 size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>

            {/* Center: Title or breadcrumbs */}
            <div className="text-xl font-semibold text-gray-800 mx-auto md:mx-0">
                Dashboard
            </div>

            {/* Right: Avatar */}
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                U
            </div>

            {/* Optional: Mobile drawer sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 bg-black/30 md:hidden">
                    <div className="w-64 bg-slate-900 h-full shadow-md p-4">
                        {/* Add your sidebar nav items here */}
                        <button
                            className="text-sm text-gray-500 mb-4"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                        </button>
                        <nav className="flex flex-col gap-3">
                            <a href="/dashboard">Dashboard</a>
                            <a href="/dashboard/users">Users</a>
                            <a href="/dashboard/settings">Settings</a>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}
