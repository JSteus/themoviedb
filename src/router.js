import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { FilterProvider } from "./hooks/useFilter";
import { Details } from "./pages/details";
import { Main } from "./pages/main";

export function Router() {
  return (
    <FilterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </FilterProvider>
  );
}
