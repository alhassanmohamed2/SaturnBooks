'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('saturn_user');
    if (storedUser) {
      try { setUser(JSON.parse(storedUser)); } catch (e) {}
    }
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('saturn_user');
    setUser(null);
    window.location.reload();
  };

  return (
    <header>
      <div className="logo">Saturn<span>Books</span></div>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/#genres">Genres</Link></li>
          <li><Link href="/#books">Library</Link></li>
          {user ? (
            <>
              <li><span style={{color: 'var(--primary-color)'}}>Hi, {user.username}</span></li>
              <li><a href="#" onClick={handleLogout} className="btn" style={{padding: '0.5rem 1.5rem', background: 'transparent', border: '1px solid var(--primary-color)'}}>Logout</a></li>
            </>
          ) : (
            <li><Link href="/login" className="btn" style={{padding: '0.5rem 1.5rem'}}>Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}
