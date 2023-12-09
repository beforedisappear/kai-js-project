import "../header/header.scss";

import userIcon from "../../resources/icons/userIcon.svg";
import cardIcon from "../../resources/icons/cardIcon.svg";

import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";

import { Link } from "react-router-dom";

import logo from "../../resources/icons/mealLogo.svg";

import AuthPopup from "../authPopup/AuthPopup";

import { showAuthPopup } from "../../api/popupSlice";
import { onShowPopup } from "../../utils";

export default function Header() {
  const auth = useSelector((state) => state.auth.accessToken);
  return (
    <header>
      <Link to="/" className="header_logo">
        <img src={logo} alt="youmeal logo" />
      </Link>

      <button className="project_button round right">
        <Link to="/cart">
          <ReactSVG src={cardIcon} />
        </Link>
      </button>

      {!!auth ? (
        <Link to="/profile" className="project_button round">
          <ReactSVG src={userIcon} />
        </Link>
      ) : (
        <button
          className="project_button auth"
          onClick={() => onShowPopup(null, true, showAuthPopup)}
        >
          <ReactSVG src={userIcon} />
          <span>ВОЙТИ</span>
        </button>
      )}
      <AuthPopup />
    </header>
  );
}
