import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "./ContentWrapper";
import Carousel from "./Carousel";
import axios from "axios";
import API_URL from "../Config/config";

const TopAnime = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/anime/top-anime`
        );
        setData(response.data);
        // console.log(response.data);
      } catch (error) {
        // console.error(error);
        fetchData();
      }
    };
    fetchData();
  }, []);

  const handleViewMore = () => {
    navigate("/viewmore/top-anime");
  };

  return (
    <div className="carouselPopularSeason">
      <ContentWrapper>
        <span className="carouselTitle">ALL TIME TOP ANIME</span>
        <button className="cta" onClick={handleViewMore}>
          <span>View More</span>
          <svg width="15px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </button>
      </ContentWrapper>
      <Carousel data={data?.data} />
    </div>
  );
};

export default TopAnime;
