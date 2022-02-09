import React from "react";

import './styles.scss';

export function CastCard({ image, name, character }) {
  return (
    <div className="cast">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{character}</p>
    </div>
  );
}
