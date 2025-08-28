"use client"
import React, { useState } from "react";

const BookFinder = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setError("");
    setBooks([]);
    try {
      const response = await fetch(
       
        'https://openlibrary.org/search.json?title=%7BbookTitle}' ,
        { cache: 'no-store'}
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log(data);  //this will print response 
      if (data.docs.length === 0) {
        setError("No results found.");
      }
      setBooks(data.docs.slice(0, 10));
    } catch (err) {
      setError("Failed to fetch books.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: "1rem", border: "1px solid #eee", borderRadius: 6 }}>
      <h2 style={{ textAlign: "center" }}>Book Finder</h2>
      <form onSubmit={searchBooks} style={{ display: "flex", marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ flex: 1, padding: 6, fontSize: 16 }}
        />
        <button type="submit" style={{ marginLeft: 8, padding: "6px 16px", fontSize: 16 }}>
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {books.map(book => (
          <li key={book.key} style={{ marginBottom: 20, borderBottom: "1px solid #ddd", paddingBottom: 8 }}>
            <div><strong>{book.title}</strong></div>
            <div style={{ fontSize: 14, color: "#555" }}>{book.author_name ? book.author_name.join(", ") : "Unknown Author"}</div>
            {book.cover_i && (
              <img
                alt="cover"
                style={{ margin: "10px 0", height: 120 }}
                src={'https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg'}
              />
            )}
            <div style={{ fontSize: 12, color: "#888" }}>First Published: {book.first_publish_year || "N/A"}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookFinder;