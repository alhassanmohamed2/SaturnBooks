'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

  const toggleMobileNav = () => setIsMobileOpen(!isMobileOpen);
  const closeMobileNav = () => setIsMobileOpen(false);

  return (
    <>
      <header>
        <div className="logo"><Link href="/">Saturn<span>Books</span></Link></div>
        
        {/* Desktop Nav */}
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/search">Search</Link></li>
            <li><Link href="/members">Members</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            {user && <li><Link href="/upload">Upload</Link></li>}
            
            {user ? (
              <>
                <li><Link href={`/user/${user.username}`}><span style={{color: 'var(--primary-color)'}}>👤 Profile ({user.username})</span></Link></li>
                <li><a href="#" onClick={handleLogout} className="btn" style={{padding: '0.5rem 1.5rem', background: 'transparent', border: '1px solid var(--primary-color)'}}>Logout</a></li>
              </>
            ) : (
              <li><Link href="/login" className="btn" style={{padding: '0.5rem 1.5rem'}}>Login</Link></li>
            )}
          </ul>
        </nav>

        {/* Hamburger Icon */}
        <button className={`hamburger ${isMobileOpen ? 'open' : ''}`} onClick={toggleMobileNav}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav ${isMobileOpen ? 'open' : ''}`}>
        <Link href="/" onClick={closeMobileNav}>Home</Link>
        <Link href="/search" onClick={closeMobileNav}>Search</Link>
        <Link href="/members" onClick={closeMobileNav}>Members</Link>
        <Link href="/about" onClick={closeMobileNav}>About</Link>
        <Link href="/contact" onClick={closeMobileNav}>Contact</Link>
        {user && <Link href="/upload" onClick={closeMobileNav}>Upload</Link>}
        
        {user ? (
          <>
            <Link href={`/user/${user.username}`} onClick={closeMobileNav} style={{color: 'var(--primary-color)'}}>👤 Profile ({user.username})</Link>
            <a href="#" onClick={(e) => { closeMobileNav(); handleLogout(e); }}>Logout</a>
          </>
        ) : (
          <Link href="/login" onClick={closeMobileNav}>Login</Link>
        )}
      </div>
    </>
  );
}
