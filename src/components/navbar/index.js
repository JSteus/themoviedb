import React from "react";

import "./styles.scss";
import image from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="menu-bg">
      <div className="menu">
        <div className="menu-logo" onClick={() => navigate("/")}>
          <img alt="themoviedb" src={image} />
        </div>
      </div>
    </nav>
  );
}
