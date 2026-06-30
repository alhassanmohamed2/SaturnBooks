'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Member {
  username: string;
  email: string;
  profile_image: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch('/api/members');
        if (!res.ok) throw new Error('Failed to fetch members');
        const data = await res.json();
        setMembers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to load members.');
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) return <div className="container"><div className="loading-spinner"></div></div>;

  return (
    <div className="container page-fade-in">
      <h1 className="section-title">Our Members</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {members.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.username}>
                <td>
                  <img
                    src={member.profile_image ? `/${member.profile_image}` : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="%231e293b"%3E%3Ccircle cx="20" cy="20" r="20"/%3E%3Ctext x="20" y="25" text-anchor="middle" fill="%2394a3b8" font-size="16" font-family="Outfit"%3E👤%3C/text%3E%3C/svg%3E'}
                    alt={member.username}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid rgba(99, 102, 241, 0.3)',
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="%231e293b"%3E%3Ccircle cx="20" cy="20" r="20"/%3E%3Ctext x="20" y="25" text-anchor="middle" fill="%2394a3b8" font-size="16" font-family="Outfit"%3E👤%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </td>
                <td style={{ fontWeight: 600 }}>{member.username}</td>
                <td style={{ color: 'var(--text-muted)' }}>{member.email}</td>
                <td>
                  <Link href={`/user/${member.username}`}>View Profile →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>No members found.</p>
        </div>
      )}
    </div>
  );
}
