import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LazyloadImg from "./LazyloadImg";
import ContentWrapper from "./ContentWrapper";

const Banner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const backgroundImages = [
    "https://wallpaper.forfun.com/fetch/d3/d374fe163503d05842a7a202e0d15a44.jpeg?w=1470&r=0.5625",
    "https://images3.alphacoders.com/134/1342304.jpeg",
    "https://img.youtube.com/vi/jKNscVwATwI/maxresdefault.jpg",
    "https://cdn.oneesports.gg/cdn-data/2024/03/Anime_GoGoLoserRanger_MainTrio_SouseiAkabane_YumekoSuzukiri_HibikiSakurama-1024x576.jpg",
    "https://statico.sportskeeda.com/editor/2024/01/848c6-17054091449470-1920.jpg",
    "https://img.youtube.com/vi/NvD4Qg2DgJc/maxresdefault.jpg",
    "https://img.youtube.com/vi/k5qM1PoLmUc/maxresdefault.jpg",
    "https://images4.alphacoders.com/135/thumb-1920-1358782.jpeg",
    "https://img.youtube.com/vi/vT9Cio_EIEE/maxresdefault.jpg",
    "https://img.youtube.com/vi/Tf31dGdlWxE/maxresdefault.jpg",
  ];

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const searchButtonClickHandler = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = backgroundImages;
        const randomIndex = Math.floor(Math.random() * data.length);
        setBackground(data[randomIndex]);
        setLoading(false);
      } catch (error) {
        fetchData();
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="banner">
      {!loading && (
        <div className="background-img">
          <LazyloadImg src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="banner-content">
          <span className="title">ANIMIX</span>
          <span className="subTitle">
            Anime series and movies to discover. Explore Now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for anime series and movies..."
              onChange={(event) => setQuery(event.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={searchButtonClickHandler}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Banner;
