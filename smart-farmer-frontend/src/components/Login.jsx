function Login({
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  loginUser,
  logoutUser,
  isLoggedIn,
}) {
  return (
    <div className="card">
      <h2>🔐 User Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />

      <br /><br />

      {!isLoggedIn ? (
        <button onClick={loginUser}>Login</button>
      ) : (
        <>
          <p style={{ color: "green", fontWeight: "bold" }}>
            ✅ Login Successful
          </p>

          <button onClick={logoutUser}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Login;