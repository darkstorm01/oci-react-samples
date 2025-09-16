import React, { useState } from "react";

const USERNAME = process.env.REACT_APP_STATIC_USER;
const PASSWORD = process.env.REACT_APP_STATIC_PASS;

function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (user === USERNAME && pass === PASSWORD) {
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Frontend Lock</h2>
        {error && <div className="error">{error}</div>}
        <input
          placeholder="Username"
          value={user}
          onChange={e => setUser(e.target.value)}
          autoFocus
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={e => setPass(e.target.value)}
        /><br/>
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;