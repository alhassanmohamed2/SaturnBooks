'use client';

import { useState, useEffect } from 'react';
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
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const searchBooks = async (searchTerm?: string) => {
    setLoading(true);
    setError('');
    try {
      const url = searchTerm ? `/api/books?q=${encodeURIComponent(searchTerm)}` : '/api/books';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch books');
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
      setSearched(true);
    } catch (err) {
      setError('Failed to search books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchBooks(query.trim());
    }
  };

  return (
    <div className="container page-fade-in">
      <h1 className="section-title">Search Books</h1>
      
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search by title, author, or genre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button
          onClick={() => { setQuery(''); searchBooks(); }}
          className="btn-outline"
          style={{ cursor: 'pointer' }}
        >
          Show All Books
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-spinner"></div>
      ) : searched ? (
        books.length > 0 ? (
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
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.name}</td>
                  <td><span className="badge">{book.Section}</span></td>
                  <td>{book.author}</td>
                  <td>{book.pages}</td>
                  <td>
                    <Link href={`/books/${book.id}`}>View Details →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>No books found matching your search.</p>
          </div>
        )
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Enter a search term or click &quot;Show All Books&quot; to browse.</p>
        </div>
      )}
    </div>
  );
}
