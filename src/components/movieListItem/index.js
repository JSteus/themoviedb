import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

import image from "../../assets/noposter.png"
import "./styles.scss";

export function MovieListItem({
  activeGenres,
  movieId,
  genreId,
  title,
  date,
  poster,
}) {
  const navigate = useNavigate();

  return (
    <div
      className={
        activeGenres.length < 1 ||
        activeGenres?.some((genre) => genreId.includes(genre))
          ? "listItemContainer"
          : "listItemContainer inactive"
      }
      onClick={() => navigate(`/details/${movieId}`)}
    >      <img src={ poster ? `https://image.tmdb.org/t/p/original${poster}` : image} alt={title} />
      <p className="title">{title}</p>
      <p className="date">{formatDate(date)}</p>
    </div>
  );
}
