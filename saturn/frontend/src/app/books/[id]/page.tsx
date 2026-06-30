'use client';

import { useState, useEffect, useRef, useCallback, use } from 'react';
import Link from 'next/link';

interface Book {
  id: number;
  name: string;
  Section: string;
  author: string;
  pages: number;
  imgpath: string;
  pdfpath: string;
  brief: string;
  buylink: string;
  lang: string;
  username: string;
}

export default function BookDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ttsState, setTtsState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) throw new Error('Book not found');
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError('Failed to load book details.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [id]);

  const getLang = useCallback((lang: string) => {
    const langMap: Record<string, string> = {
      ar: 'ar-SA',
      en: 'en-US',
      fr: 'fr-FR',
      es: 'es-ES',
      de: 'de-DE',
    };
    return langMap[lang?.toLowerCase()] || 'en-US';
  }, []);

  const handlePlay = () => {
    if (!book?.brief) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(book.brief);
    utterance.lang = getLang(book.lang);
    utterance.onend = () => setTtsState('idle');
    utterance.onerror = () => setTtsState('idle');
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setTtsState('playing');
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setTtsState('paused');
  };

  const handleResume = () => {
    window.speechSynthesis.resume();
    setTtsState('playing');
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setTtsState('idle');
  };

  if (loading) return <div className="container"><div className="loading-spinner"></div></div>;
  if (error || !book) return (
    <div className="container page-fade-in">
      <div className="alert alert-error">{error || 'Book not found.'}</div>
      <Link href="/search" className="btn-outline">← Back to Search</Link>
    </div>
  );

  return (
    <div className="container page-fade-in">
      <div className="book-detail">
        <img
          src={`/${book.imgpath}`}
          alt={book.name}
          className="book-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="350" height="450" fill="%231e293b"%3E%3Crect width="350" height="450" rx="16"/%3E%3Ctext x="175" y="225" text-anchor="middle" fill="%2394a3b8" font-size="18" font-family="Outfit"%3ENo Cover%3C/text%3E%3C/svg%3E';
          }}
        />

        <div className="book-info">
          <h1>{book.name}</h1>

          <div className="book-meta">
            <span className="badge">📚 {book.Section}</span>
            <span className="badge">✍️ {book.author}</span>
            <span className="badge">📄 {book.pages} pages</span>
            <span className="badge badge-accent">👤 {book.username}</span>
          </div>

          <p className="book-brief">{book.brief || 'No description available.'}</p>

          <div className="book-actions">
            {book.pdfpath && (
              <a href={`/${book.pdfpath}`} download className="btn">
                ⬇ Download PDF
              </a>
            )}
            {book.buylink && (
              <a href={book.buylink} target="_blank" rel="noopener noreferrer" className="btn-accent">
                🛒 Buy Book
              </a>
            )}
            <Link href="/search" className="btn-outline">← Back</Link>
          </div>

          {book.brief && (
            <div>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-muted)' }}>🔊 Text-to-Speech</h3>
              <div className="tts-controls">
                <button
                  className={`tts-btn ${ttsState === 'playing' ? 'active' : ''}`}
                  onClick={handlePlay}
                  title="Play"
                >
                  ▶
                </button>
                <button
                  className="tts-btn"
                  onClick={handlePause}
                  disabled={ttsState !== 'playing'}
                  title="Pause"
                >
                  ⏸
                </button>
                <button
                  className="tts-btn"
                  onClick={handleResume}
                  disabled={ttsState !== 'paused'}
                  title="Resume"
                >
                  ⏯
                </button>
                <button
                  className="tts-btn"
                  onClick={handleStop}
                  disabled={ttsState === 'idle'}
                  title="Stop"
                >
                  ⏹
                </button>
                <span className="tts-label">
                  {ttsState === 'playing' ? 'Playing...' : ttsState === 'paused' ? 'Paused' : 'Ready'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
