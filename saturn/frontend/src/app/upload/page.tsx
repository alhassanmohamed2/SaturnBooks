'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UploadPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [newBookId, setNewBookId] = useState<number | null>(null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // Form fields
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [section, setSection] = useState('');
  const [pages, setPages] = useState('');
  const [buylink, setBuylink] = useState('');
  const [brief, setBrief] = useState('');
  const [lang, setLang] = useState('en');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('saturn_user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    try {
      setUser(JSON.parse(storedUser));
    } catch {
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');
    setSuccess('');
    setProgress(0);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('author', author);
    formData.append('section', section);
    formData.append('pages', pages);
    formData.append('buylink', buylink);
    formData.append('brief', brief);
    formData.append('lang', lang);
    formData.append('username', user.username);
    if (imageFile) formData.append('image', imageFile);
    if (pdfFile) formData.append('pdf', pdfFile);

    try {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const pct = Math.round((e.loaded / e.total) * 100);
          setProgress(pct);
        }
      });

      const result = await new Promise<any>((resolve, reject) => {
        xhr.onload = () => {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } catch {
            reject(new Error('Invalid response'));
          }
        };
        xhr.onerror = () => reject(new Error('Upload failed'));
        xhr.open('POST', '/api/books');
        xhr.send(formData);
      });

      if (result.success || result.id) {
        setSuccess('Book uploaded successfully! 🎉');
        setNewBookId(result.id || null);
        // Reset form
        setName(''); setAuthor(''); setSection(''); setPages('');
        setBuylink(''); setBrief(''); setLang('en');
        setImageFile(null); setPdfFile(null);
        if (formRef.current) formRef.current.reset();
      } else {
        setError(result.message || 'Upload failed. Please try again.');
      }
    } catch (err) {
      setError('Failed to upload book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="container"><div className="loading-spinner"></div></div>;

  return (
    <div className="container page-fade-in" style={{ maxWidth: '700px' }}>
      <h1 className="section-title">Upload a Book</h1>

      {success && (
        <div className="alert alert-success">
          {success}
          {newBookId && (
            <Link href={`/books/${newBookId}`} style={{ marginLeft: '1rem', fontWeight: 700 }}>
              View Book →
            </Link>
          )}
        </div>
      )}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Book Name *</label>
            <input
              type="text" className="form-input" required
              value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Enter book title"
            />
          </div>

          <div className="form-group">
            <label>Author *</label>
            <input
              type="text" className="form-input" required
              value={author} onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Section / Genre *</label>
              <input
                type="text" className="form-input" required
                value={section} onChange={(e) => setSection(e.target.value)}
                placeholder="e.g. Fiction, Science"
              />
            </div>
            <div className="form-group">
              <label>Pages *</label>
              <input
                type="number" className="form-input" required min="1"
                value={pages} onChange={(e) => setPages(e.target.value)}
                placeholder="Number of pages"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Buy Link</label>
            <input
              type="url" className="form-input"
              value={buylink} onChange={(e) => setBuylink(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="form-group">
            <label>Language</label>
            <select className="form-select" value={lang} onChange={(e) => setLang(e.target.value)}>
              <option value="en">English</option>
              <option value="ar">Arabic</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              <option value="de">German</option>
            </select>
          </div>

          <div className="form-group">
            <label>Brief Description *</label>
            <textarea
              className="form-textarea" required
              value={brief} onChange={(e) => setBrief(e.target.value)}
              placeholder="Write a brief description of the book..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Cover Image *</label>
              <input
                type="file" className="form-input" accept="image/*" required
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                style={{ padding: '0.6rem' }}
              />
            </div>
            <div className="form-group">
              <label>PDF File *</label>
              <input
                type="file" className="form-input" accept=".pdf" required
                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                style={{ padding: '0.6rem' }}
              />
            </div>
          </div>

          {loading && (
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          )}

          <button
            type="submit" className="btn"
            disabled={loading}
            style={{ width: '100%', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? `Uploading... ${progress}%` : '📚 Upload Book'}
          </button>
        </form>
      </div>
    </div>
  );
}
