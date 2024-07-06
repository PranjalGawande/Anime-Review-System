import React, { useEffect, useState } from "react";
import ContentWrapper from "./ContentWrapper";
import Carousel from "./Carousel";

const Recommendation = ({ data, loading }) => {
  // console.log("data", data);

  return (
    <ContentWrapper>
      {data && data.length > 0 && (
        <Carousel
          title="Recommendations"
          data={data.map((item) => item.entry)}
        />
      )}
    </ContentWrapper>
  );
};

export default Recommendation;
