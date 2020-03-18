import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSmile} from "@fortawesome/free-regular-svg-icons";

function Header() {
  const clearStorage = () => {
    console.log();

  };
  return (
    <header>
      <nav className="left-side">
        <Link to="/">
          <img src="../images/maet-logo.png" alt="logo" />
        </Link>
        <Link to="/register">등록</Link>
        <Link to="/statistics">통계</Link>
      </nav>
      <div className="right-side">
        <FontAwesomeIcon icon={faSmile} onClick={clearStorage} />
      </div>
    </header>
  );
}

export default Header;