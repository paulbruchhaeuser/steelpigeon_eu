import "./Header.css";
import { useState } from "react";

function Header({ onImprintClick, onContactClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleImprintClick = () => {
    onImprintClick();
    setMenuOpen(false);
  };

  const handleContactClick = () => {
    onContactClick();
    setMenuOpen(false);
  };

  return (
    <div className="header">
      <div className="header-content">
        <h1 className="logo">STEELPIGEON</h1>

        {menuOpen && (
          <nav className="mobile-menu">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleContactClick();
              }}
            >
              Contact
            </a>
            <a
              href="#imprint"
              onClick={(e) => {
                e.preventDefault();
                handleImprintClick();
              }}
            >
              Imprint
            </a>
          </nav>
        )}
        <button className="burger-menu" onClick={toggleMenu}>
          <span
            className={menuOpen ? "burger-line active" : "burger-line"}
          ></span>
          <span
            className={menuOpen ? "burger-line active" : "burger-line"}
          ></span>
          <span
            className={menuOpen ? "burger-line active" : "burger-line"}
          ></span>
        </button>
      </div>
    </div>
  );
}

export default Header;
