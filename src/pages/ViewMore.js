import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import ContentWrapper from "../components/ContentWrapper";
import AnimeCard from "../components/AnimeCard";
import Spinner from "../components/Spinner";
import noResults from "../components/assets/no-results.png";

const ViewMore = () => {
  const [data, setData] = useState({ pagination: {}, data: [] });
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const type = useParams().type;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:9292/api/anime/${type}?page=${pageNum}`
      );

      const newData = response.data;
      // console.log("newData", newData);
      setData((prevData) => ({
        pagination: newData.pagination,
        data: [...(prevData?.data || []), ...newData.data],
      }));
      setPageNum((prevPageNum) => prevPageNum + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPageData = async () => {
    try {
      const response = await axios
        .get(`http://localhost:9292/api/anime/${type}?page=${pageNum}`)
        .then((response) => {
          if (data?.data) {
            setData({
              ...data,
              data: [...data?.data, ...response.data.data],
            });
          } else {
            setData(response.data);
          }
          // console.log("Nextdata", data);
          setPageNum((prev) => prev + 1);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setData(null);
    setPageNum(1);
    fetchData();
  }, []);

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">
            {(type === "current-season" && "Popular This Season") ||
              (type === "top-anime" && "All Time Top Anime") ||
              (type === "upcoming-anime" && "Upcoming Next Season")}
          </div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data?.pagination?.items?.count > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.data?.length || []}
                next={fetchNextPageData}
                hasMore={
                  pageNum <= data?.pagination?.last_visible_page &&
                  data?.pagination?.has_next_page
                }
                loader={<Spinner />}
              >
                {data.data.map((item, index) => {
                  return <AnimeCard key={index} data={item} type={type} />;
                })}
              </InfiniteScroll>
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

export default ViewMore;
