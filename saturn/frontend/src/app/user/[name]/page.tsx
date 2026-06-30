'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

interface UserBook {
  id: number;
  name: string;
  Section: string;
  author: string;
  pages: number;
}

interface UserProfile {
  username: string;
  email: string;
  profile_image: string;
  books: UserBook[];
}

export default function UserProfilePage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/user/${name}`);
        if (!res.ok) throw new Error('User not found');
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError('Failed to load user profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();

    // Check if own profile
    const storedUser = localStorage.getItem('saturn_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.username === name) {
          setIsOwnProfile(true);
        }
      } catch {}
    }
  }, [name]);

  const handleAvatarUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!avatarFile) return;

    setUploading(true);
    setUploadMsg('');

    const formData = new FormData();
    formData.append('avatar', avatarFile);

    try {
      const res = await fetch(`/api/user/${name}/avatar`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setUploadMsg('Avatar updated successfully!');
        // Refresh profile
        const refreshRes = await fetch(`/api/user/${name}`);
        const refreshData = await refreshRes.json();
        setProfile(refreshData);
      } else {
        setUploadMsg(data.message || 'Failed to update avatar.');
      }
    } catch {
      setUploadMsg('Failed to upload avatar.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="container"><div className="loading-spinner"></div></div>;
  if (error || !profile) return (
    <div className="container page-fade-in">
      <div className="alert alert-error">{error || 'User not found.'}</div>
      <Link href="/members" className="btn-outline">← Back to Members</Link>
    </div>
  );

  return (
    <div className="container page-fade-in">
      <div className="profile-section">
        <div className="profile-card">
          <img
            src={profile.profile_image ? `/uploads/${profile.profile_image}` : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="%231e293b"%3E%3Ccircle cx="60" cy="60" r="60"/%3E%3Ctext x="60" y="70" text-anchor="middle" fill="%2394a3b8" font-size="40" font-family="Outfit"%3E👤%3C/text%3E%3C/svg%3E'}
            alt={profile.username}
            className="profile-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="%231e293b"%3E%3Ccircle cx="60" cy="60" r="60"/%3E%3Ctext x="60" y="70" text-anchor="middle" fill="%2394a3b8" font-size="40" font-family="Outfit"%3E👤%3C/text%3E%3C/svg%3E';
            }}
          />
          <h2>{profile.username}</h2>
          <p>{profile.email}</p>
          <p style={{ marginTop: '1rem' }}>
            <span className="badge">📚 {profile.books?.length || 0} Books</span>
          </p>

          {isOwnProfile && (
            <div style={{ marginTop: '2rem' }}>
              <form onSubmit={handleAvatarUpload} style={{ marginBottom: '1rem' }}>
                <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                  <input
                    type="file" className="form-input" accept="image/*"
                    onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                    style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                  />
                </div>
                <button
                  type="submit" className="btn"
                  disabled={!avatarFile || uploading}
                  style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem' }}
                >
                  {uploading ? 'Uploading...' : '📷 Update Avatar'}
                </button>
              </form>
              {uploadMsg && (
                <p style={{ fontSize: '0.85rem', color: uploadMsg.includes('success') ? '#10b981' : 'var(--accent-color)' }}>
                  {uploadMsg}
                </p>
              )}
              <Link href="/upload" className="btn-outline" style={{ display: 'block', marginTop: '0.75rem', padding: '0.6rem', fontSize: '0.85rem', textAlign: 'center' }}>
                📚 Upload A Book
              </Link>
            </div>
          )}
        </div>

        <div className="profile-books">
          <h2 className="section-title" style={{ textAlign: 'left', fontSize: '1.8rem', marginBottom: '1.5rem' }}>
            {isOwnProfile ? 'Your Books' : `${profile.username}'s Books`}
          </h2>

          {profile.books && profile.books.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Section</th>
                  <th>Author</th>
                  <th>Pages</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {profile.books.map((book) => (
                  <tr key={book.id}>
                    <td style={{ fontWeight: 600 }}>{book.name}</td>
                    <td><span className="badge">{book.Section}</span></td>
                    <td>{book.author}</td>
                    <td>{book.pages}</td>
                    <td>
                      <Link href={`/books/${book.id}`}>View →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No books uploaded yet.</p>
              {isOwnProfile && (
                <Link href="/upload" className="btn" style={{ marginTop: '1rem', display: 'inline-block' }}>
                  Upload Your First Book
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
