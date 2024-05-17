import React, { useState, useEffect } from "react";
import axios from "axios";
import ContentWrapper from "../components/ContentWrapper";
import AnimeCard from "../components/AnimeCard";
import Spinner from "../components/Spinner";
import noResults from "../components/assets/no-results.png";

const WatchList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");

  const fetchData = async () => {
    setLoading(true);
    try {
      const header = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`http://localhost:9292/getWatchList`, {
        headers: header,
      });
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">My Watchlist</div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data.length > 0 ? (
              <div className="content">
                {data.map((item, index) => {
                  return (
                    <AnimeCard key={index} data={item} type={"WatchList"}
                      fetchWatchlistData={fetchData}  
                    />
                  );
                })}
              </div>
            ) : (
              <span className="resultNotFound d-flex justify-content-center align-items-center flex-column">
                Sorry, Results not found!
                <img src={noResults} width={"50%"} alt="No results found" />
              </span>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default WatchList;
