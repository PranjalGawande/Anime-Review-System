import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
// import "./styles/style.scss";
import ContentWrapper from "./ContentWrapper";
// import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [genresData, setGenresData] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      if (window.scrollY > 200) {
        if (scroll > lastScrollY && !mobileMenu) {
          setShow("hide");
        } else {
          setShow("top");
        }
      }
      else {
        setShow("top");
      }
      setLastScrollY(scroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])


  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  }

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9292/api/anime/get-anime-genres"
      );
      setGenresData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <a href="/">ANIMIX</a>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigate("/explore", { state: { genresData: genresData } })}>
            EXPLORE
          </li>
          <li className="menuItem">LOGIN</li>
          <li className="menuItem">SIGNUP</li>
        </ul>

        <div className="mobileMenuItems">
          {mobileMenu ? (<VscChromeClose
            onClick={toggleMobileMenu}
          />)
            :
            (<SlMenu
              onClick={toggleMobileMenu}
            />)}
        </div>
      </ContentWrapper>
    </header>
  );
};

export default Header;