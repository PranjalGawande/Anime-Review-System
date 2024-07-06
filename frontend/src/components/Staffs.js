import React, { useRef } from "react";
import ContentWrapper from "./ContentWrapper";
import avatar from "./assets/avatar.jpg";
import LazyloadImg from "./LazyloadImg";

const Staffs = ({ data, loading }) => {
  const carouselContainer = useRef(null);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

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

  return (
    <div className="StaffSection">
      <ContentWrapper>
        {data && (
          <div>
            <div className="sectionHeading">Staff</div>
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
              <div className="listItems" ref={carouselContainer}>
                {data?.map((item) => {
                  let Image_url = item?.person?.images?.jpg?.image_url
                    ? item?.person?.images?.jpg?.image_url
                    : avatar;
                  if (Image_url && Image_url.includes("questionmark")) {
                    Image_url = avatar;
                  }
                  return (
                    <div key={item?.id} className="listItem">
                      <div className="profileImg">
                        <LazyloadImg src={Image_url} />
                      </div>
                      <div className="name">{item?.person?.name}</div>
                      <div className="staff">{item?.positions[0]}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="staffSkeleton">
                {skeleton()}
                {skeleton()}
                {skeleton()}
                {skeleton()}
                {skeleton()}
                {skeleton()}
              </div>
            )}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Staffs;
