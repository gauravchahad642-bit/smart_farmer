function Dashboard({
  crops,
  fertilizers,
  pests,
  recommendations,
  users,
}) {
  return (
    <div className="dashboard">

      <div className="dashboard-card">
        <h2>{crops.length}</h2>
        <span>🌱 Crops</span>
      </div>

      <div className="dashboard-card">
        <h2>{fertilizers.length}</h2>
        <span>🧪 Fertilizers</span>
      </div>

      <div className="dashboard-card">
        <h2>{pests.length}</h2>
        <span>🐛 Pests</span>
      </div>

      <div className="dashboard-card">
        <h2>{recommendations.length}</h2>
        <span>🌾 Recommendations</span>
      </div>

      <div className="dashboard-card">
        <h2>{users.length}</h2>
        <span>👤 Users</span>
      </div>

    </div>
  );
}

export default Dashboard;