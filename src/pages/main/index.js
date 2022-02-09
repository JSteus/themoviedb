import React, { useEffect, useState } from "react";
import { GenresButton } from "../../components/genresButton";
import { MovieListItem } from "../../components/movieListItem";
import Navbar from "../../components/navbar";
import { Paginator } from "../../components/paginator";
import { useFilter } from "../../hooks/useFilter";
import { api } from "../../services/api";

import "./styles.scss";

export function Main() {
  const { filterState, handleFilterState } = useFilter();
  const [popularMovies, setPopularMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function getPopularMovies() {
      try {
        const { data } = await api.get("movie/popular", {
          params: {
            page: page + 1,
          },
        });
        setPopularMovies(data.results);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
      } catch (e) {
        console.log(e);
      }
    }

    getPopularMovies();
  }, [page]);

  return (
    <>
      <Navbar />

      <header className="mainContainer">
        <div className="mainHeader">
          <h1>
            Milhões de filmes, séries e pessoas para descobrir. Explore já.
          </h1>
        </div>
        <GenresButton
          activeIds={filterState}
          setActiveIds={handleFilterState}
        />
      </header>

      <main className="movieList">
        {popularMovies?.map((movie) => (
          <MovieListItem
            activeGenres={filterState}
            key={movie.id}
            movieId={movie.id}
            genreId={movie.genre_ids}
            title={movie.title}
            date={movie.release_date}
            poster={movie.poster_path}
          />
        ))}
      </main>

      {filterState.length === 0  && (
        <Paginator total={totalPages} onPageChange={setPage} page={page} />
      )}
    </>
  );
}
