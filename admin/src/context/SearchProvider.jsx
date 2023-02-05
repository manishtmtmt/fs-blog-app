import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPost } from "../api/post";
import { useNotification } from "./NotificationProvider";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);
  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    const { error, posts } = await searchPost(query);
    if (error) return updateNotification("error", error);
    setSearchResult(posts);
    navigate("/");
  };

  const resetSearch = () => {
    setSearchResult([]);
  };

  return (
    <SearchContext.Provider value={{ searchResult, handleSearch, resetSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);

export default SearchProvider;
