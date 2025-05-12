"use strict";
// app/dashboard/layout.tsx
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardLayout;
const Header_1 = __importDefault(require("../components/Header"));
const Sidebar_1 = __importDefault(require("../components/Sidebar"));
function DashboardLayout({ children }) {
    return (<div className="flex h-screen bg-gray-100">
      <Sidebar_1.default />
      <div className="flex flex-col flex-1">
        <Header_1.default />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>);
}
