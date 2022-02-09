import React, { useEffect, useState } from "react";
import { api } from "../../services/api";

import { BsFillXCircleFill } from "react-icons/bs";
import "./styles.scss";

export function GenresButton({ activeIds, setActiveIds }) {
  const [genres, setGenres] = useState([]);
  
  useEffect(() => {
    async function getGenresList() {
      try {
        const { data } = await api.get("genre/movie/list");
        setGenres(data.genres);
      } catch (e) {
        console.log(e);
      }
    }

    getGenresList();
  }, []);
  return (
    <>
      <p className="filterTitle">FILTRE POR:</p>
      <div className="genresContainer">
        {genres?.map((genre) => {
          return (
            <button
              key={genre.id}
              className={
                activeIds.includes(genre.id)
                  ? "genresButtonActive"
                  : "genresButton"
              }
              onClick={() =>
                activeIds.includes(genre.id)
                  ? setActiveIds(activeIds.filter((item) => item !== genre.id))
                  : setActiveIds([...activeIds, genre.id])
              }
            >
              {genre.name}
              <BsFillXCircleFill />
            </button>
          );
        })}
      </div>
    </>
  );
}
