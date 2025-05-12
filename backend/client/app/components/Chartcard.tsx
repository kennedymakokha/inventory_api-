// components/ChartCard.tsx
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

interface ChartData {
  month: string;
  sales: number;
}

export default function ChartCard({ data }: { data: ChartData[] }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full max-w-3xl">
      <h2 className="font-semibold mb-2">Sales Overview</h2>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="sales" stroke="#4F46E5" />
      </LineChart>
    </div>
  );
}
