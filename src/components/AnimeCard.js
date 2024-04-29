import React from "react";
import { useNavigate } from "react-router-dom";
import LazyloadImg from "./LazyloadImg";
import CircleRating from "./CircleRating";
import NoImagePlaceholder from "./assets/No-Image-Placeholder.png";

const AnimeCard = ({ data, fromSearch }) => {
    // const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    // const posterUrl = data.poster_path
    //     ? url.poster + data.poster_path
    //     : PosterFallback;
    const ImageUrl = data?.images ? data?.images?.jpg?.large_image_url : NoImagePlaceholder;
    return (
        <div
            className="animeCard"
            onClick={() =>
                navigate(`/anime/${data?.mal_id}`)
            }
        >
            <div className="imageBlock">
                <LazyloadImg className="Img" src={ImageUrl} />
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                {/* <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span> */}
            </div>
        </div>
    );
};

export default AnimeCard;