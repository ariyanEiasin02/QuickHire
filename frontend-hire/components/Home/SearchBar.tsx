"use client";
import React, { useState, useRef, useEffect } from "react";
import "@/styles/SearchBar.scss";

const recentSearches = ["UI Designer", "React Developer", "Product Manager"];
const popularSuggestions = [
  { icon: "fi-rr-briefcase", label: "UI Designer", type: "Design" },
  { icon: "fi-rr-code-simple", label: "Frontend Developer", type: "Engineering" },
  { icon: "fi-rr-search-alt", label: "UX Researcher", type: "Research" },
  { icon: "fi-rr-mobile", label: "Android Developer", type: "Engineering" },
  { icon: "fi-rr-settings", label: "Admin Manager", type: "Management" },
];

const locations = [
  "Florence, Italy",
  "Rome, Italy",
  "Milan, Italy",
  "New York, USA",
  "London, UK",
  "Berlin, Germany",
  "Paris, France",
];

interface SearchBarProps {
  onSearch?: (keyword: string, location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Florence, Italy");
  const [isOpen, setIsOpen] = useState(false);
  const [locOpen, setLocOpen] = useState(false);
  const [filtered, setFiltered] = useState(popularSuggestions);

  const wrapRef = useRef<HTMLDivElement>(null);
  const locRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
      if (locRef.current && !locRef.current.contains(e.target as Node)) {
        setLocOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!keyword.trim()) {
      setFiltered(popularSuggestions);
    } else {
      setFiltered(
        popularSuggestions.filter((s) =>
          s.label.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
  }, [keyword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    setLocOpen(false);
    onSearch?.(keyword, location);
  };

  const pickSuggestion = (label: string) => {
    setKeyword(label);
    setIsOpen(false);
  };

  return (
    <form className="qh-searchbar" onSubmit={handleSubmit} autoComplete="off">

      <div className="sb-keyword" ref={wrapRef}>
        <div
          className={`sb-input-wrap ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(true)}
        >
          <i className="fi fi-rr-search sb-icon" />
          <input
            type="text"
            placeholder="Job title or keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => setIsOpen(true)}
            aria-label="Job title or keyword"
            aria-expanded={isOpen}
            aria-autocomplete="list"
          />
          {keyword && (
            <button
              type="button"
              className="sb-clear"
              onClick={(e) => {
                e.stopPropagation();
                setKeyword("");
              }}
              aria-label="Clear"
            >
              <i className="fi fi-rr-cross-small" />
            </button>
          )}
        </div>

        {isOpen && (
          <div className="sb-dropdown" role="listbox">
            {!keyword && recentSearches.length > 0 && (
              <div className="sb-group">
                <span className="sb-group-label">
                  <i className="fi fi-rr-clock" /> Recent Searches
                </span>
                {recentSearches.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="sb-item sb-item--recent"
                    role="option"
                    onClick={() => pickSuggestion(s)}
                  >
                    <i className="fi fi-rr-rotate-right sb-item-icon" />
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="sb-group">
              <span className="sb-group-label">
                <i className="fi fi-rr-flame" /> Popular
              </span>
              {filtered.length > 0 ? (
                filtered.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    className="sb-item"
                    role="option"
                    onClick={() => pickSuggestion(s.label)}
                  >
                    <i className={`fi ${s.icon} sb-item-icon`} />
                    <span className="sb-item-label">{s.label}</span>
                    <span className="sb-item-type">{s.type}</span>
                  </button>
                ))
              ) : (
                <p className="sb-empty">No results for &quot;{keyword}&quot;</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="sb-divider" />

      <div className="sb-location" ref={locRef}>
        <div
          className={`sb-input-wrap ${locOpen ? "active" : ""}`}
          onClick={() => setLocOpen((p) => !p)}
        >
          <i className="fi fi-rr-map-marker sb-icon" />
          <span className="sb-loc-text">{location}</span>
          <i className={`fi fi-rr-angle-small-down sb-chevron ${locOpen ? "rotated" : ""}`} />
        </div>

        {locOpen && (
          <div className="sb-dropdown sb-dropdown--loc" role="listbox">
            {locations.map((loc) => (
              <button
                key={loc}
                type="button"
                className={`sb-item ${loc === location ? "sb-item--selected" : ""}`}
                role="option"
                aria-selected={loc === location}
                onClick={() => {
                  setLocation(loc);
                  setLocOpen(false);
                }}
              >
                <i className="fi fi-rr-map-marker sb-item-icon" />
                {loc}
                {loc === location && <i className="fi fi-rr-check sb-item-check" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="sb-btn">
        Search my job
      </button>
    </form>
  );
};

export default SearchBar;
