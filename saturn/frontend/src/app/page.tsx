'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // Fetch visitor count from the backend API
    const fetchVisitors = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/visitors`);
        const data = await res.json();
        setVisitorCount(data.visitor);
      } catch (err) {
        console.error('Failed to fetch visitors', err);
      }
    };
    fetchVisitors();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>The Power of Reading</h1>
          <p>Reading can make you a scholar, linguist, intellectual, philosopher, expert, and a good person. It stimulates imagination, intelligence, character, abilities, and skills.</p>
          <a href="#books" className="btn">Explore Library</a>
          
          <div className="stats">
            <div className="stat-item">
              <div className="stat-value">{visitorCount !== null ? visitorCount : '...'}</div>
              <div className="stat-label">Total Visitors</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">2020</div>
              <div className="stat-label">Established</div>
            </div>
          </div>
        </div>
      </section>

      <section id="genres" className="container">
        <h2 className="section-title">Types of Books</h2>
        <div className="grid">
          <div className="card">
            <h3>Action & Adventure</h3>
            <p>Constantly have you on the edge of your seat with excitement. The protagonist has an ultimate goal to achieve and is always put in risky, often dangerous situations.</p>
          </div>
          <div className="card">
            <h3>Classics</h3>
            <p>Groundbreaking stories at their publish time that have continued to be impactful for generations, serving as the foundation for popular works today.</p>
          </div>
          <div className="card">
            <h3>Graphic Novels</h3>
            <p>Engaging, sequential narrative art presented in a specific design or traditional panel layout you find in comics.</p>
          </div>
          <div className="card">
            <h3>Mystery & Detective</h3>
            <p>The plot revolves around a crime of sorts that must be solved—or foiled—by the protagonists.</p>
          </div>
        </div>
      </section>
    </>
  )
}
