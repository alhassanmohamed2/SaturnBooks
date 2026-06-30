'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, reason, message }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Message sent successfully! We\'ll get back to you soon. ✉️');
        setName(''); setEmail(''); setReason('General Inquiry'); setMessage('');
      } else {
        setError(data.message || 'Failed to send message.');
      }
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page-fade-in" style={{ maxWidth: '600px' }}>
      <h1 className="section-title">Contact Us</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', marginTop: '-1.5rem' }}>
        Have a question or feedback? We&apos;d love to hear from you.
      </p>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name *</label>
            <input
              type="text" className="form-input" required
              value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email" className="form-input" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label>Reason</label>
            <select className="form-select" value={reason} onChange={(e) => setReason(e.target.value)}>
              <option>General Inquiry</option>
              <option>Bug Report</option>
              <option>Feature Request</option>
              <option>Partnership</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Message *</label>
            <textarea
              className="form-textarea" required
              value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit" className="btn"
            disabled={loading}
            style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Sending...' : '📬 Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
