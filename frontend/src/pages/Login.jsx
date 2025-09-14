import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeName, setStoreName] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      let res;
      if (isSignup) {
        res = await API.post('/auth/signup', {
          email,
          password,
          store_name: storeName
        });
      } else {
        res = await API.post('/auth/login', { email, password });
      }

      localStorage.setItem('token', res.data.token);
      if (onLogin) onLogin();
      nav('/dashboard', { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError(err?.response?.data?.error || 'Login error, please try again.');
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {isSignup ? 'Create an Account' : 'Welcome Back'}
        </h2>

        {error && (
          <div style={{
            backgroundColor: '#ffe5e5',
            color: '#b00020',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              fontSize: '16px'
            }}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              fontSize: '16px'
            }}
          />
          {isSignup && (
            <input
              placeholder="Store name"
              value={storeName}
              onChange={e => setStoreName(e.target.value)}
              required
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            />
          )}
          <button type="submit" style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            {isSignup ? 'Sign up' : 'Login'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <button
            onClick={() => setIsSignup(!isSignup)}
            style={{
              background: 'none',
              border: 'none',
              color: '#007bff',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isSignup ? 'Already have an account? Login' : 'Create an account'}
          </button>
        </div>
      </div>
    </div>
  );
}
