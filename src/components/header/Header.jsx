import "../header/header.scss";

import userIcon from "../../resources/icons/userIcon.svg";
import cardIcon from "../../resources/icons/cardIcon.svg";

import { ReactSVG } from "react-svg";

import { Link } from "react-router-dom";

import logo from "../../resources/icons/mealLogo.svg";

export default function Header() {
  return (
    <header>
      <Link to="/" className="header_logo">
        <img src={logo} alt="youmeal logo" />
      </Link>

      <button className="project_button round">
        <Link to="/cart">
          <ReactSVG src={cardIcon} />
        </Link>
      </button>

      <button className="project_button auth">
        <ReactSVG src={userIcon} />
        <span>ВОЙТИ</span>
      </button>
    </header>
  );
}
