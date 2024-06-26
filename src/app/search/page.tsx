import './style.css';
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface SearchProps {
  searchTerm: string;
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ searchTerm, onSearchTermChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search"
        value={searchTerm}
        onChange={onSearchTermChange}
      />
      <button type="button" className="search-button">
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default Search;
