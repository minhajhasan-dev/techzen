import React, { createContext, useState } from "react";

export const SearchFilterContext = createContext();

export const SearchFilterProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("default");
  const [brand, setBrand] = useState("default");
  const [priceRange, setPriceRange] = useState("default");
  const [sortBy, setSortBy] = useState("default");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchFilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        category,
        setCategory,
        brand,
        setBrand,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
};
