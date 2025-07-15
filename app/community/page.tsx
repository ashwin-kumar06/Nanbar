import React from 'react';
import { COLORS } from '@/lib/constants';
import '@/styles/community.css';

export default function CommunityPage() {
  const communityPosts = [
    {
      id: 1,
      title: "Fixed a Jammed Door",
      description: "I used graphite powder and aligned the hinges. Took 15 minutes!",
      author: "Rajesh Kumar",
      category: "Carpenter",
      timeAgo: "2 hours ago",
      likes: 24,
      comments: 5,
      difficulty: "Easy",
      timeSpent: "15 min",
      cost: "₹50",
      image: "/api/placeholder/300/200",
      tags: ["door", "hinges", "quick-fix"]
    },
    {
      id: 2,
      title: "Replaced a Flickering Bulb",
      description: "Found out the socket was loose. Tightened it and it worked perfectly.",
      author: "Priya Sharma",
      category: "Electrician",
      timeAgo: "4 hours ago",
      likes: 18,
      comments: 3,
      difficulty: "Easy",
      timeSpent: "5 min",
      cost: "₹0",
      image: "/api/placeholder/300/200",
      tags: ["electrical", "bulb", "socket"]
    },
    {
      id: 3,
      title: "Fixed Leaking Tap",
      description: "Was a worn-out washer. Replaced it for ₹20. Saved a lot on plumber charges!",
      author: "Amit Patel",
      category: "Plumber",
      timeAgo: "1 day ago",
      likes: 42,
      comments: 8,
      difficulty: "Medium",
      timeSpent: "30 min",
      cost: "₹20",
      image: "/api/placeholder/300/200",
      tags: ["plumbing", "tap", "washer"]
    },
    {
      id: 4,
      title: "Unclogged Kitchen Sink",
      description: "Used baking soda and vinegar method. Works like magic without harsh chemicals!",
      author: "Sneha Reddy",
      category: "Plumber",
      timeAgo: "2 days ago",
      likes: 35,
      comments: 12,
      difficulty: "Easy",
      timeSpent: "20 min",
      cost: "₹15",
      image: "/api/placeholder/300/200",
      tags: ["kitchen", "sink", "natural-remedy"]
    }
  ];

  const categories = [
    { name: "All", count: 156, active: true },
    { name: "Plumber", count: 45, active: false },
    { name: "Electrician", count: 32, active: false },
    { name: "Carpenter", count: 28, active: false },
    { name: "Painter", count: 24, active: false },
    { name: "HVAC", count: 15, active: false },
    { name: "Mason", count: 12, active: false }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return COLORS.success;
      case 'Medium': return COLORS.warning;
      case 'Hard': return COLORS.danger;
      default: return COLORS.accent;
    }
  };

  return (
    <div className="community-container">
      {/* Header Section */}
      <div className="community-header">
        <div className="header-content">
          <h1 className="community-title">DIY Community</h1>
          <p className="community-subtitle">
            Join thousands of DIY enthusiasts sharing solutions, tips, and experiences. 
            Learn from others and share your own success stories!
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <span>📖</span>
            Share Your Story
          </button>
          <button className="btn-primary">
            <span>➕</span>
            Create Post
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="community-stats">
        <div className="stat-card">
          <div className="stat-number">1,247</div>
          <div className="stat-label">Active Members</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">3,456</div>
          <div className="stat-label">Problems Solved</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">₹2.4L</div>
          <div className="stat-label">Money Saved</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">156</div>
          <div className="stat-label">Posts This Week</div>
        </div>
      </div>

      <div className="community-content">
        {/* Sidebar */}
        <div className="community-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Categories</h3>
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`category-btn ${category.active ? 'active' : ''}`}
                >
                  {category.name}
                  <span className="category-count">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">Top Contributors</h3>
            <div className="contributors-list">
              <div className="contributor-item">
                <div className="contributor-avatar">RK</div>
                <div className="contributor-info">
                  <div className="contributor-name">Rajesh Kumar</div>
                  <div className="contributor-posts">42 posts</div>
                </div>
              </div>
              <div className="contributor-item">
                <div className="contributor-avatar">PS</div>
                <div className="contributor-info">
                  <div className="contributor-name">Priya Sharma</div>
                  <div className="contributor-posts">38 posts</div>
                </div>
              </div>
              <div className="contributor-item">
                <div className="contributor-avatar">AP</div>
                <div className="contributor-info">
                  <div className="contributor-name">Amit Patel</div>
                  <div className="contributor-posts">35 posts</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="community-main">
          <div className="content-header">
            <h2 className="content-title">Recent Success Stories</h2>
            <div className="content-filters">
              <select className="filter-select">
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>

          <div className="posts-grid">
            {communityPosts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-image">
                  <img src={post.image} alt={post.title} />
                  <div className="post-category">{post.category}</div>
                </div>
                
                <div className="post-content">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-description">{post.description}</p>
                  
                  <div className="post-meta">
                    <div className="post-stats">
                      <span 
                        className="difficulty-badge"
                        style={{ backgroundColor: getDifficultyColor(post.difficulty) }}
                      >
                        {post.difficulty}
                      </span>
                      <span className="stat-item">⏱ {post.timeSpent}</span>
                      <span className="stat-item">💰 {post.cost}</span>
                    </div>
                    
                    <div className="post-tags">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="tag">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="post-footer">
                    <div className="post-author">
                      <span className="author-name">{post.author}</span>
                      <span className="post-time">{post.timeAgo}</span>
                    </div>
                    
                    <div className="post-actions">
                      <button className="action-btn">
                        <span>👍</span>
                        {post.likes}
                      </button>
                      <button className="action-btn">
                        <span>💬</span>
                        {post.comments}
                      </button>
                      <button className="action-btn">
                        <span>📤</span>
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="load-more">
            <button className="btn-secondary">Load More Stories</button>
          </div>
        </div>
      </div>
    </div>
  );
}