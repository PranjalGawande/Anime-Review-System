import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "./ContentWrapper";
import NoImagePlaceholder from "./assets/No-Image-Placeholder.png";
import LazyloadImg from "./LazyloadImg";
import CircleRating from "./CircleRating";

const Carousel = ({ data, isUpcoming, title }) => {
  const [loading, setLoading] = useState(false);
  const carouselContainer = useRef(null);
  const navigate = useNavigate();

  const navigation = (direction) => {
    const container = carouselContainer.current;
    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skeletonItem = () => {
    return (
      <div className="skeletonItem">
        <div className="imageBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {data && data.length > 0 && title && (
          <div className="carouselTitle text-dark text-start">{title}</div>
        )}
        <button
          className="carousel-control-prev arrow carouselLeftNav"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
          onClick={() => {
            navigation("left");
          }}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next arrow carouselRightNav"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
          onClick={() => {
            navigation("right");
          }}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>

        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.slice(0, 15)?.map((item) => {
              const image = item.images
                ? item.images.jpg.large_image_url
                : NoImagePlaceholder;
              return (
                <div
                  key={item.id}
                  className="carouselItem"
                  onClick={() => navigate(`/anime/${item?.mal_id}`)}
                >
                  <div className="imageBlock">
                    <LazyloadImg src={image} />
                    {!isUpcoming && !title && (
                      <CircleRating rating={item?.score} />
                    )}
                  </div>
                  <div className="textBlock">
                    <span className="title">
                      {item?.title_english ? item?.title_english : item?.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
