import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSearch } from "../context/SearchProvider";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { handleSearch, resetSearch, searchResult } = useSearch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;
    handleSearch(query);
  };

  const handleReset = (e) => {
    resetSearch();
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      resetSearch();
      setQuery("");
    }
  };
  return (
    <form className="relative" onSubmit={handleSubmit}>
      <input
        value={query}
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search ..."
        className="border w-56 border-gray-500 outline-none rounded p-1 focus:ring-1 ring-blue-500"
      />
      {searchResult.length ? (
        <button
          onClick={handleReset}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
        >
          <AiOutlineClose />
        </button>
      ) : null}
    </form>
  );
};

export default SearchBar;
