import React, { useState, useEffect } from "react";

const News = () => {
  const [news, setNews] = useState([]); // State to store news articles
  const [filter, setFilter] = useState("all"); // Filter for "all" or "accident" news
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch news from newsdata.io API
  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY; // API key from .env
      const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=in`; // API endpoint for India news

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      // Set the news articles (assuming the API returns an array of articles in `results`)
      setNews(data.results || []);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch news on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Filter news based on keywords for "accident" news
  const accidentKeywords = ["accident", "crash", "collision", "wreck", "incident"];
  const filteredNews =
    filter === "accident"
      ? news.filter((item) =>
          accidentKeywords.some(
            (keyword) =>
              (item.title && item.title.toLowerCase().includes(keyword)) ||
              (item.description && item.description.toLowerCase().includes(keyword))
          )
        )
      : news;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>News from India</h1>

      {/* Filter Selection */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="news-filter" style={{ marginRight: "10px" }}>
          Filter:
        </label>
        <select
          id="news-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All News</option>
          <option value="accident">Accident News</option>
        </select>
      </div>

      {/* Refresh Button */}
      <button
        onClick={fetchNews}
        disabled={loading}
        style={{ marginBottom: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        {loading ? "Refreshing..." : "Refresh News"}
      </button>

      {/* Loading and Error Messages */}
      {loading && <p>Loading news...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Display News Items */}
      {filteredNews.length > 0 ? (
        filteredNews.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h2>{item.title}</h2>
            <p>{item.description || "No description available"}</p>
            <p style={{ fontSize: "0.9em", color: "#555" }}>
              Published:{" "}
              {item.pubDate ? new Date(item.pubDate).toLocaleString() : "Unknown date"}
            </p>
            {item.link && (
              <p>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </p>
            )}
          </div>
        ))
      ) : (
        !loading && <p>No news items found.</p>
      )}
    </div>
  );
};

export default News;