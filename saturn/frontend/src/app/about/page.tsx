export default function AboutPage() {
  return (
    <>
      <section className="hero" style={{ padding: '5rem 2rem' }}>
        <div className="hero-content">
          <h1>About Saturn Books</h1>
          <p>A premium digital library platform dedicated to making knowledge accessible to everyone, everywhere.</p>
        </div>
      </section>

      <section className="container">
        <h2 className="section-title">Our Story</h2>
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)', lineHeight: '2', fontSize: '1.1rem' }}>
            Founded in <strong style={{ color: 'var(--primary-color)' }}>2020</strong>, Saturn Books began with a simple mission: 
            to create a platform where readers and authors come together to share knowledge and stories. 
            We believe that every book has the power to transform a life, and every reader deserves 
            access to a universe of knowledge.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: '2', fontSize: '1.1rem', marginTop: '1.5rem' }}>
            Our platform enables users to upload, share, and discover books across all genres and languages. 
            With features like text-to-speech, instant downloads, and a vibrant community, Saturn Books 
            is more than a library — it&apos;s a gateway to endless possibilities.
          </p>
        </div>
      </section>

      <section className="container">
        <h2 className="section-title">Our Team</h2>
        <div className="grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="card team-card">
            <div
              className="team-avatar"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              AM
            </div>
            <h3>Alhassan Mohamed</h3>
            <span className="team-role">Full Stack Developer</span>
            <p>Architect and lead developer behind Saturn Books. Built the platform from the ground up — 
            backend APIs, database design, and the modern frontend experience.</p>
          </div>

          <div className="card team-card">
            <div
              className="team-avatar"
              style={{ background: 'linear-gradient(135deg, #f43f5e, #ec4899)' }}
            >
              AM
            </div>
            <h3>Alaa Mahdy</h3>
            <span className="team-role">HTML/CSS Developer</span>
            <p>The creative eye behind Saturn Books&apos; stunning interface. Crafted the visual identity, 
            responsive layouts, and polished UI that makes the platform a joy to use.</p>
          </div>
        </div>
      </section>

      <section className="container">
        <h2 className="section-title">Our Mission</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📚</div>
            <h3>Share Knowledge</h3>
            <p>Making books accessible to everyone through a free, open platform.</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌍</div>
            <h3>Global Community</h3>
            <p>Connecting readers and authors from every corner of the world.</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚀</div>
            <h3>Innovation</h3>
            <p>Leveraging technology like TTS and smart search to enhance reading.</p>
          </div>
        </div>
      </section>
    </>
  );
}
