import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ContentWrapper from "../components/ContentWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import AnimeCard from "../components/AnimeCard";
import Spinner from "../components/Spinner";
import noResults from "../components/assets/no-results.png";
import API_URL from "../Config/config";

const SearchResult = () => {
  const [data, setData] = useState({ pagination: {}, data: [] });
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const { query } = useParams();

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}/api/anime/search?q=${query}&page=${pageNum}`
        );
        const data = response.data;
        const newData = response.data;
        setData((prevData) => ({
          pagination: newData.pagination,
          // data: [...prevData.data, ...newData.data]
          data: newData.data,
        }));
        // console.log("First Data", data);
        setPageNum((prev) => prev + 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
    setPageNum(1);
  }, [query]);

  const fetchNextPageData = async () => {
    try {
      const response = await axios
        .get(
          `${API_URL}/api/anime/search?q=${query}&page=${pageNum}`
        )
        .then((res) => {
          if (data?.data) {
            setData({
              ...data,
              data: [...data?.data, ...res.data.data],
            });
          } else {
            setData(res);
          }
          // console.log("Nextdata", data);
          setPageNum((prev) => prev + 1);
          // console.log("PageNum", pageNum);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.data?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.pagination?.items?.count > 1 ? "results" : "result"
                } of "${query}"`}
              </div>
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
                  return (
                    <AnimeCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h1>No Results</h1>
              <img src={noResults} width={"50%"} alt="No results found" />
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
