import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Charts({
  crops,
  fertilizers,
  pests,
  recommendations,
  users,
}) {
  const data = [
    { name: "Crops", count: crops.length },
    { name: "Fertilizers", count: fertilizers.length },
    { name: "Pests", count: pests.length },
    { name: "Recommendations", count: recommendations.length },
    { name: "Users", count: users.length },
  ];

  return (
    <div className="card">
      <h2>📊 Dashboard Chart</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#2e7d32" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Charts;