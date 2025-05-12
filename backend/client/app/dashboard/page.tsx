'use client';

import ChartCard from "../components/Chartcard";


const sampleData = [
  { month: 'Jan', sales: 400 },
  { month: 'Feb', sales: 600 },
  { month: 'Mar', sales: 350 },
  { month: 'Apr', sales: 700 },
  { month: 'May', sales: 500 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Welcome back 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example Stat Cards */}
        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-sm text-gray-500">Total Users</h2>
          <p className="text-xl font-semibold">1,240</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-sm text-gray-500">Active Sessions</h2>
          <p className="text-xl font-semibold">320</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-sm text-gray-500">Monthly Revenue</h2>
          <p className="text-xl font-semibold">$12,300</p>
        </div>
      </div>

      {/* Chart */}
      <ChartCard data={sampleData} />
    </div>
  );
}
