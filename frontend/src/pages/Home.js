import React from "react";
import Banner from "../components/Banner";
import SeasonPopular from "../components/SeasonPopular";
import UpcomingNextSeason from "../components/UpcomingNextSeason";
import TopAnime from "../components/TopAnime";

const Home = () => {
  return (
    <div>
      <Banner />
      <SeasonPopular />
      <UpcomingNextSeason />
      <TopAnime />
    </div>
  );
};

export default Home;
