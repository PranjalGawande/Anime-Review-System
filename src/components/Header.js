import React, { useState, useEffect, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
// import "./styles/style.scss";
import ContentWrapper from "./ContentWrapper";
// import logo from "../../assets/movix-logo.svg";
import LoginForm from "./LoginForm";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [genresData, setGenresData] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const loginRef = useRef(null);


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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setShowLoginForm(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setShowLoginForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  useEffect(() => {
    const body = document.body;
    if (showLoginForm) {
      body.style.overflow = "hidden"; // Disable scrolling
    } else {
      body.style.overflow = "visible"; // Enable scrolling
    }
  }, [showLoginForm]);

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  }

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
    setShow(showLoginForm ? "top" : "blur");
  };

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
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show} ${showLoginForm ? "blur" : ""}`}>
      <ContentWrapper>
        <div className="logo">
          <a href="/">ANIMIX</a>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigate("/explore", { state: { genresData: genresData } })}>
            EXPLORE
          </li>
          <li className="menuItem" onClick={toggleLoginForm}>LOGIN</li>
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

      {showLoginForm && <LoginForm ref={loginRef}
        onClose={() => setShowLoginForm(false)} />}
    </header>
  );
};

export default Header;