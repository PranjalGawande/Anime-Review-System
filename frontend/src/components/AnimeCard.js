import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LazyloadImg from "./LazyloadImg";
import CircleRating from "./CircleRating";
import NoImagePlaceholder from "./assets/No-Image-Placeholder.png";
import toast from "react-hot-toast";
import API_URL from "../Config/config";

const AnimeCard = ({ data, type, fetchWatchlistData }) => {
  const navigate = useNavigate();
  const [ImageUrl, setImageUrl] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (type === "WatchList") {
      setImageUrl(data?.images?.image_url || NoImagePlaceholder);
    } else {
      setImageUrl(data?.images?.jpg?.large_image_url || NoImagePlaceholder);
    }
  }, [data, type]);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(sessionStorage.getItem("token"));
    };
    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleRemoveWatchlist = async (e) => {
    e.stopPropagation();
    try {
      const header = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `${API_URL}/deleteWatchList`,
        {
          animeId: data.animeId,
        },
        {
          headers: header,
        }
      );
      fetchWatchlistData();
      toast.success("Removed from watchlist");
    } catch (error) {
      toast.error("Failed to remove from watchlist");
      // console.error(error);
    }
  };
  return (
    <div
      className="animeCard"
      onClick={() => navigate(`/anime/${data?.mal_id || data?.animeId}`)}
    >
      <div className="imageBlock">
        <LazyloadImg className="Img" src={ImageUrl} />
        {(type === "current-season" || type === "top-anime") && (
          <React.Fragment>
            <CircleRating rating={data.score} />
          </React.Fragment>
        )}
        {type === "WatchList" && (
          <button className="removeButton" onClick={handleRemoveWatchlist}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data.title_english || data.title}</span>
      </div>
    </div>
  );
};

export default AnimeCard;
