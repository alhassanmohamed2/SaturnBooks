'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const endpoint = isLogin ? '/api/login' : '/api/register';
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    
    try {
      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      
      const data = await res.json();
      if (data.success) {
        setSuccess(isLogin ? 'Logged in successfully!' : 'Registered successfully! You can now log in.');
        if (isLogin) {
          setTimeout(() => router.push('/'), 1000);
        } else {
          setIsLogin(true);
        }
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    }
  };

  return (
    <div className="container" style={{maxWidth: '500px'}}>
      <div className="card" style={{marginTop: '2rem'}}>
        <h2 style={{marginBottom: '2rem', textAlign: 'center'}}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        
        {error && <div style={{color: 'var(--accent-color)', marginBottom: '1rem', padding: '0.5rem', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '8px'}}>{error}</div>}
        {success && <div style={{color: '#10b981', marginBottom: '1rem', padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px'}}>{success}</div>}

        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <div>
            <label style={{display: 'block', marginBottom: '0.5rem'}}>Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white'}}
            />
          </div>
          
          {!isLogin && (
            <div>
              <label style={{display: 'block', marginBottom: '0.5rem'}}>Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white'}}
              />
            </div>
          )}

          <div>
            <label style={{display: 'block', marginBottom: '0.5rem'}}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white'}}
            />
          </div>

          <button type="submit" className="btn" style={{width: '100%', marginTop: '1rem'}}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div style={{marginTop: '2rem', textAlign: 'center'}}>
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              style={{background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 'bold'}}
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
