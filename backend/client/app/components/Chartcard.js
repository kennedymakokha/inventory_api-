"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChartCard;
// components/ChartCard.tsx
const recharts_1 = require("recharts");
function ChartCard({ data }) {
    return (<div className="bg-white rounded-xl shadow p-4 w-full max-w-3xl">
      <h2 className="font-semibold mb-2">Sales Overview</h2>
      <recharts_1.LineChart width={500} height={300} data={data}>
        <recharts_1.XAxis dataKey="month"/>
        <recharts_1.YAxis />
        <recharts_1.Tooltip />
        <recharts_1.Line type="monotone" dataKey="sales" stroke="#4F46E5"/>
      </recharts_1.LineChart>
    </div>);
}
