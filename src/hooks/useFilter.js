import React, { useState, useContext, createContext } from "react";

const FilterContext = createContext([]);

export function FilterProvider({ children }) {
  const [filterState, setFilterState] = useState([]);

  function handleFilterState(filterInput) {
    setFilterState(filterInput);
  }

  return (
    <FilterContext.Provider value={{ filterState, handleFilterState }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);

  return context;
}
