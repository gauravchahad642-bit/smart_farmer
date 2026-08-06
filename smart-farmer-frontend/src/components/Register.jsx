function Register({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  registerUser,
  isLoggedIn,
}) {
  if (isLoggedIn) return null;

  return (
    <div className="card">
      <h2>👤 User Registration</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={registerUser}>
        Register User
      </button>
    </div>
  );
}

export default Register;