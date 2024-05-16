import React, { useState, useEffect, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ContentWrapper from "./ContentWrapper";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const loginRef = useRef(null);
  const [token, setToken] = useState(null);


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

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };


  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(!showSearch);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

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
    setShowRegisterForm(false);
    setShow(showLoginForm ? "top" : "blur");
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
    setShowLoginForm(false);
    setShow(showRegisterForm ? "top" : "blur");
  };


  const handleRegisterSuccess = () => {
    setShowRegisterForm(false);
    setShowLoginForm(true);
  };

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, [token])

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.dispatchEvent(new Event('storage'));
    setToken(null);

    if(location.pathname === "/watchlist") {
      navigate("/");
    }
  };

  const getRandomAnime = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9292/api/anime/random-anime"
      );
      const animeId = response.data.data.mal_id;
      navigate(`/anime/${animeId}`, { state: { data: response.data.data } });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show} ${showLoginForm ? "blur" : ""}`}>
      <ContentWrapper>
        <div className="logo">
          <span className="menuItem" onClick={() => navigate("/")}>ANIMIX</span>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigate("/explore")}>
            EXPLORE
          </li>
          <li className="menuItem" onClick={() => getRandomAnime()}>
            RANDOM
          </li>
          {token && (
            <li className="menuItem" onClick={() => navigate("/watchlist")}>
              MY WATCH LIST
            </li>
          )}

          {!token ? (<li className="menuItem" onClick={toggleLoginForm}>LOGIN</li>)
            : (<li className="menuItem logout" onClick={handleLogout}>LOGOUT</li>)}
          {/* <li className="menuItem" onClick={toggleLoginForm}>LOGIN</li>
          <li className="menuItem">SIGNUP</li> */}
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>


        <div className="mobileMenuItems">
          {/* <HiOutlineSearch onClick={openSearch} /> */}
          {mobileMenu ? (<VscChromeClose
            onClick={toggleMobileMenu}
          />)
            :
            (<SlMenu
              onClick={toggleMobileMenu}
            />)}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a Anime"
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose
                onClick={() => setShowSearch(false)}
              />
            </div>
          </ContentWrapper>
        </div>
      )}

      <div className={`loginFormWrapper ${showLoginForm ? "show" : ""}`}>
        {showLoginForm && (
          <LoginForm
            setToken={setToken}
            ref={loginRef}
            onClose={() => setShowLoginForm(false)}
            onRegister={toggleRegisterForm}
          />
        )}
      </div>

      <div className={`registerFormWrapper ${showRegisterForm ? "show" : ""}`}>
        {showRegisterForm && (
          <RegisterForm
            ref={loginRef}
            onClose={() => setShowRegisterForm(false)}
            onRegisterSuccess={handleRegisterSuccess}
          />
        )}
      </div>

    </header>
  );
};

export default Header;