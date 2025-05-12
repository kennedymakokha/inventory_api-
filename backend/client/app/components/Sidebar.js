"use strict";
// components/Sidebar.tsx
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Sidebar;
const link_1 = __importDefault(require("next/link"));
function Sidebar() {
    return (<div className="hidden md:flex md:flex-col w-64 bg-slate-900 border-r">
            <div className="p-4 font-bold text-lg">Admin</div>
            <nav className="flex flex-col gap-2 p-4">
                <link_1.default href="/dashboard" className="hover:text-slate-900 hover:bg-gray-100 p-2 rounded">Dashboard</link_1.default>
                <link_1.default href="/dashboard/users" className="hover:text-slate-900 hover:bg-gray-100 p-2 rounded">Users</link_1.default>
                <link_1.default href="/dashboard/settings" className="hover:text-slate-900 hover:bg-gray-100 p-2 rounded">Settings</link_1.default>
            </nav>
        </div>);
}
