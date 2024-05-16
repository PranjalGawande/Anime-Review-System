import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import axios from "axios";
import ContentWrapper from "../components/ContentWrapper";
import AnimeCard from "../components/AnimeCard";
import Spinner from "../components/Spinner";
import noResults from "../components/assets/no-results.png";

let filters = {};

const genreData = [
  { mal_id: 1, name: "Action" },
  { mal_id: 2, name: "Adventure" },
  { mal_id: 46, name: "Award Winning" },
  { mal_id: 4, name: "Comedy" },
  { mal_id: 8, name: "Drama" },
  { mal_id: 10, name: "Fantasy" },
  { mal_id: 47, name: "Gourmet" },
  { mal_id: 14, name: "Horror" },
  { mal_id: 7, name: "Mystery" },
  { mal_id: 22, name: "Romance" },
  { mal_id: 24, name: "Sci-Fi" },
  { mal_id: 36, name: "Slice of Life" },
  { mal_id: 30, name: "Sports" },
  { mal_id: 37, name: "Supernatural" },
  { mal_id: 41, name: "Suspense" },
];

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const [data, setData] = useState({ pagination: {}, data: [] });
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState([]);
  const [genrePageNum, setGenrePageNum] = useState(1);
  const { explore } = useParams();

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (filters.with_genres) {
        params.append("page", genrePageNum);
        params.append("genres", filters.with_genres);
      } else {
        params.append("page", pageNum);
      }

      const response = await axios.get(
        `http://localhost:9292/api/anime/explore?${params}`
      );
      const newData = response.data;
      setData((prevData) => ({
        pagination: newData.pagination,
        // data: [...(prevData?.data || []), ...newData.data]
        data: newData.data,
      }));
      if (filters.with_genres) {
        setGenrePageNum((prevPageNum) => prevPageNum + 1);
      } else {
        setPageNum((prevPageNum) => prevPageNum + 1);
      }
      // console.log("PageNum", pageNum);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPageData = async () => {
    const params = new URLSearchParams();

    if (filters.with_genres) {
      params.append("page", genrePageNum);
      params.append("genres", filters.with_genres);
    } else {
      params.append("page", pageNum);
    }

    // console.log("Params next", params.toString());

    try {
      const response = await axios
        .get(`http://localhost:9292/api/anime/explore?${params}`)
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
          if (filters.with_genres) {
            setGenrePageNum((prev) => prev + 1);
          } else {
            setPageNum((prev) => prev + 1);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    fetchData();
  }, [explore]);

  const onChange = (selectedItems, action) => {
    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.mal_id;
        filters.with_genres = genreId;
        // console.log("filters", filters.with_genres);
      } else {
        delete filters.with_genres;
      }
    }

    setPageNum(1);
    setGenrePageNum(1);
    fetchData();
  };

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">Explore Anime</div>
          <div className="filters">
            <Select
              name="genres"
              value={genre}
              closeMenuOnSelect={true}
              options={genreData}
              isClearable={true}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.mal_id}
              onChange={onChange}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
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
                  return (
                    <AnimeCard key={index} data={item} fromSearch={true} />
                  );
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

export default Explore;
