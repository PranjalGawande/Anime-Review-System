import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LazyloadImg from "./LazyloadImg";
import CircleRating from "./CircleRating";
import NoImagePlaceholder from "./assets/No-Image-Placeholder.png";

const AnimeCard = ({ data, type }) => {
    // const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const [ImageUrl, setImageUrl] = useState('');
    console.log("data", data);
    console.log("type", type);
    // const posterUrl = data.poster_path
    //     ? url.poster + data.poster_path
    //     : PosterFallback;
    useEffect(() => {
        if (type === "WatchList") {
            setImageUrl(data?.images?.image_url || NoImagePlaceholder);
            console.log("ImageUrl", ImageUrl);
        } else {
            setImageUrl(data?.images?.jpg?.large_image_url || NoImagePlaceholder);
        }
    }, [data, type]);
    // const ImageUrl = data?.images ? data?.images?.jpg?.large_image_url : NoImagePlaceholder;

    const handleRemoveWatchlist = async (e) => {
        e.stopPropagation();
        try {
            // const response = await axios.post('http://localhost:9292/removeWatchList', {
            //     animeId: data.mal_id
            // });
            // console.log("remove watchlist response", response);
            // fetchData();
            console.log("data", data.animeId);
        } catch (error) {
            console.error(error);
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
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