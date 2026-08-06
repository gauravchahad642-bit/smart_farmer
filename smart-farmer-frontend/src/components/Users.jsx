function Users({ 
    users, 
    showUsers, 
    setShowUsers,
    search
}) {
  return (
    <div className="card">
      <h2>👥 Users</h2>

      <button onClick={() => setShowUsers(!showUsers)}>
        {showUsers ? "Hide Users" : "View Users"}
      </button>

      <p>Total Users: {users.length}</p>

      {showUsers &&
        users.map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default Users;
