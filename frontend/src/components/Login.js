// src/Login.js
import React, { useState } from 'react';
import { useNavigate }       from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [form, setForm]     = useState({ email: '', password: '' });
  const [error, setError]   = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email" name="email" placeholder="Email"
          value={form.email} onChange={handleChange} required
        />
        <input
          type="password" name="password" placeholder="Password"
          value={form.password} onChange={handleChange} required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
