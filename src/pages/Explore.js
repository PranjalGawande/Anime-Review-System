// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroll-component";
// import Select from "react-select";
// import axios from "axios";

// // import "./style.scss";

// // import useFetch from "../../hooks/useFetch";
// // import { fetchDataFromApi } from "../../utils/api";
// import ContentWrapper from "../components/ContentWrapper";
// import AnimeCard from "../components/AnimeCard";
// import Spinner from "../components/Spinner";
// import noResults from '../components/assets/no-results.png'

// let filters = {};

// const genreData = [
//     { mal_id: 1, name: "Action" },
//     { mal_id: 2, name: "Adventure" },
//     { mal_id: 46, name: "Award Winning" },
//     { mal_id: 4, name: "Comedy" },
//     { mal_id: 8, name: "Drama" },
//     { mal_id: 10, name: "Fantasy" },
//     { mal_id: 47, name: "Gourmet" },
//     { mal_id: 14, name: "Horror" },
//     { mal_id: 7, name: "Mystery" },
//     { mal_id: 22, name: "Romance" },
//     { mal_id: 24, name: "Sci-Fi" },
//     { mal_id: 36, name: "Slice of Life" },
//     { mal_id: 30, name: "Sports" },
//     { mal_id: 37, name: "Supernatural" },
//     { mal_id: 41, name: "Suspense" }
// ];

// const sortbyData = [
//     { value: "popularity.desc", label: "Popularity Descending" },
//     { value: "popularity.asc", label: "Popularity Ascending" },
//     { value: "vote_average.desc", label: "Rating Descending" },
//     { value: "vote_average.asc", label: "Rating Ascending" },
//     {
//         value: "primary_release_date.desc",
//         label: "Release Date Descending",
//     },
//     { value: "primary_release_date.asc", label: "Release Date Ascending" },
//     { value: "original_title.asc", label: "Title (A-Z)" },
// ];

// const Explore = () => {
//     const [data, setData] = useState({ pagination: {}, data: [] });
//     // const [data, setData] = useState(null);
//     const [pageNum, setPageNum] = useState(1);
//     const [loading, setLoading] = useState(false);
//     // const [genresData, setGenresData] = useState(null);
//     const [genre, setGenre] = useState([]);
//     const [sortby, setSortby] = useState(null);
//     // const { mediaType } = useParams();
//     const navigate = useNavigate();
//     const [noRefresh, setNoRefresh] = useState(false);
//     const location = useLocation();
//     // const genresData = location.state?.genresData;

//     // const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

//     // const fetchGenres = async () => {
//     //     try {
//     //         const response = await axios.get("http://localhost:9292/api/anime/get-anime-genres");
//     //         setGenresData(response.data);
//     //         // return response.data;
//     //     } catch (error) {
//     //         console.error(error);
//     //         // return [];
//     //     }
//     // };

//     // useEffect(() => {
//         // const fetchData = async () => {
//         //     setLoading(true);
//         //     console.log("genre", genre);
//         //     const genreQueryParam = genre ? `&genres=${genre.map(g => g.mal_id).join(',')}` : '';
//         //     setTimeout(() => {
//         //         console.log("genreQueryParam", genreQueryParam);
//         //     }, 5000);
//         //     // console.log("genreQueryParam", genreQueryParam);
//         //     try {
//         //         const response = await axios.get(`http://localhost:9292/api/anime/explore?page=${pageNum}`);
//         //         // const data = response.data;
//         //         // setData(data);
//         //         // setPageNum((prev => prev + 1));
//         //         // setLoading(false);
//         //         const newData = response.data;
//         //         console.log("newData", newData);
//         //         setData(prevData => ({
//         //             pagination: newData.pagination,
//         //             data: [...(prevData?.data || []), ...newData.data]
//         //         }));
//         //         setPageNum(prevPageNum => prevPageNum + 1);
//         //         // setTimeout(() => {
//         //         //    console.log("First Data", data); 
//         //         // }, 5000);
//         //     } catch (error) {
//         //         console.error(error);
//         //     } finally {
//         //         setLoading(false);
//         //     }
//         // }
//     //     fetchData();
//     //     setPageNum(1);
//     // // }, []);

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const params = new URLSearchParams();

//             // Add page number
//             params.append('page', pageNum);

//             // Add selected sort filter
//             if (sortby) {
//                 params.append('&sort', sortby.value);
//             }

//             // Add selected genre filter
//             if (genre.length > 0) {
//                 const genreIds = genre.map((g) => g.mal_id).join(',');
//                 params.append('&genres', genreIds);
//                 console.log("genreIds", genreIds);
//             }

//             console.log("params", params)

//             const response = await axios.get(`http://localhost:9292/api/anime/explore?${params}`);
//             const newData = response.data;
//             setData(prevData => ({
//                 pagination: newData.pagination,
//                 data: [...(prevData?.data || []), ...newData.data]
//             }));
//             setPageNum(prevPageNum => prevPageNum + 1);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };


//     const fetchNextPageData = async () => {
//         const genreQueryParam = genre ? `&genres=${genre.map(g => g.mal_id).join(',')}` : '';
//         setTimeout(() => {
//             console.log("genreQueryParam", genreQueryParam);
//         }, 5000);
//         // console.log("genreQueryParam", genreQueryParam);
//         try {
//             const response = await axios.get(`http://localhost:9292/api/anime/explore?page=${pageNum}`).then((response) => {
//                 if (data?.data) {
//                     setData({
//                         ...data, data: [...data?.data, ...response.data.data]
//                     })
//                 } else {
//                     setData(response.data);
//                 }
//                 console.log("Nextdata", data);
//                 setPageNum((prev) => prev + 1);
//             }
//             );
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     useEffect(() => {
//         if (!noRefresh) {
//             // If noRefresh is false (which means it's not a refresh), execute the effect
//             filters = {};
//             setData(null);
//             setPageNum(1);
//             setSortby(null);
//             // setGenre(null);
//             fetchData();
//             // fetchGenres();
//         }
//     }, [noRefresh]);

//     // useEffect(() => {
//     //     fetchData();
//     // }, [genre, sortby]);

//     const onChange = (selectedItems, action) => {
//         if (action.name === "sortby") {
//             setSortby(selectedItems);
//             if (action.action !== "clear") {
//                 filters.sort_by = selectedItems.value;
//             } else {
//                 delete filters.sort_by;
//             }
//         }

//         if (action.name === "genres") {
//             setGenre(selectedItems);
//             if (action.action !== "clear") {
//                 let genreId = selectedItems.map((g) => g.id);
//                 genreId = JSON.stringify(genreId).slice(1, -1);
//                 filters.with_genres = genreId;
//             } else {
//                 delete filters.with_genres;
//             }
//         }

//         setPageNum(1);
//         fetchData();
//     };



//     // const onChange = (selectedItems, action) => {
//     //     if (action.name === "sortby") {
//     //         setSortby(selectedItems);
//     //         if (action.action !== "clear") {
//     //             filters.sort_by = selectedItems.value;
//     //         } else {
//     //             delete filters.sort_by;
//     //         }
//     //     }

//     //     if (action.name === "genres") {
//     //         const selectedGenre = selectedItems[0];
//     //         console.log("selectedGenre", selectedGenre);

//     //         console.log("selectedItems", selectedItems);
//     //         if (action.action !== "clear") {
//     //             let genreId = selectedItems.map((g) => g.mal_id);
//     //             genreId = JSON.stringify(genreId).slice(1, -1);
//     //             filters.with_genres = genreId;
//     //             setNoRefresh(true);
//     //         } else {
//     //             delete filters.with_genres;
//     //         }
//     //         console.log("filters", filters);
//     //         setGenre(selectedGenre);
//     //     }

//     //     setPageNum(1);
//     //     fetchData();
//     // };

//     return (
//         <div className="explorePage">
//             <ContentWrapper>
//                 <div className="pageHeader">
//                     <div className="pageTitle">
//                         Explore Anime
//                     </div>
//                     <div className="filters">
//                         <Select
//                             isMulti
//                             name="genres"
//                             value={genre}
//                             closeMenuOnSelect={false}
//                             options={genreData}
//                             getOptionLabel={(option) => option.name}
//                             getOptionValue={(option) => option.mal_id}
//                             onChange={onChange}
//                             placeholder="Select genres"
//                             className="react-select-container genresDD"
//                             classNamePrefix="react-select"
//                         />
//                         <Select
//                             name="sortby"
//                             value={sortby}
//                             options={sortbyData}
//                             onChange={onChange}
//                             isClearable={true}
//                             placeholder="Sort by"
//                             className="react-select-container sortbyDD"
//                             classNamePrefix="react-select"
//                         />
//                     </div>
//                 </div>
//                 {loading && <Spinner initial={true} />}
//                 {!loading && (
//                     <>
//                         {data?.pagination?.items?.count > 0 ? (
//                             <InfiniteScroll
//                                 className='content'
//                                 dataLength={data?.data?.length || []}
//                                 next={fetchNextPageData}
//                                 // hasMore={pageNum <= data?.pagination?.last_visible_page}
//                                 hasMore={pageNum <= data?.pagination?.last_visible_page && data?.pagination?.has_next_page}
//                                 loader={<Spinner />}
//                             >
//                                 {data.data.map((item, index) => {
//                                     return (
//                                         <AnimeCard key={index} data={item} fromSearch={true} />
//                                     )
//                                 })}
//                             </InfiniteScroll>
//                         ) : (
//                             <span className="resultNotFound d-flex justify-content-center align-items-center flex-column">
//                                 Sorry, Results not found!
//                                 <img src={noResults} width={"50%"} alt='No results found' />
//                             </span>
//                         )}
//                     </>
//                 )}
//             </ContentWrapper>
//         </div>
//     );
// };

// export default Explore;




import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import axios from "axios";

// import "./style.scss";

// import useFetch from "../../hooks/useFetch";
// import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../components/ContentWrapper";
import AnimeCard from "../components/AnimeCard";
import Spinner from "../components/Spinner";
import noResults from '../components/assets/no-results.png'

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
    { mal_id: 41, name: "Suspense" }
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
    const [sortby, setSortby] = useState(null);
    const navigate = useNavigate();
    const [noRefresh, setNoRefresh] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const location = useLocation();

    const fetchData = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('page', pageNum);

            if (sortby) {
                params.append('sort', sortby.value);
            }

            setTimeout(() => {
                if (selectedGenres.length > 0) {
                const genreIds = selectedGenres.map((g) => g.mal_id).join(',');
                params.append('genres', genreIds);
            }
            }, 5000);

            

            console.log("params", params.toString());

            const response = await axios.get(`http://localhost:9292/api/anime/explore?${params}`);
            const newData = response.data;
            setData(prevData => ({
                pagination: newData.pagination,
                data: newData.data
            }));
            setPageNum(prevPageNum => prevPageNum + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     if (!noRefresh) {
    //         filters = {};
    //         setData(null);
    //         setPageNum(1);
    //         setSortby(null);
    //         fetchData();
    //     }
    // }, [noRefresh]); // Add genre to the dependency array

    const onChange = (selectedItems, action) => {
        if (action.name === "sortby") {
            setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }

        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }

        setPageNum(1);
        setNoRefresh(prev => !prev); // Toggle the value to trigger useEffect
    };

    const handleApply = () => {
        setPageNum(1);
        setSelectedGenres([...genre]); // Save selected genres
        fetchData(); // Fetch data with selected genres
    };

    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        Explore Anime
                    </div>
                    <div className="filters">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genreData}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.mal_id}
                            onChange={(selectedItems) => setGenre(selectedItems)}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                         <button onClick={handleApply}>Apply</button>
                    </div>
                    
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {data?.pagination?.items?.count > 0 ? (
                            <InfiniteScroll
                                className='content'
                                dataLength={data?.data?.length || []}
                                next={fetchData} // Use fetchData instead of fetchNextPageData
                                hasMore={pageNum <= data?.pagination?.last_visible_page && data?.pagination?.has_next_page}
                                loader={<Spinner />}
                            >
                                {data.data.map((item, index) => {
                                    return (
                                        <AnimeCard key={index} data={item} fromSearch={true} />
                                    )
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound d-flex justify-content-center align-items-center flex-column">
                                Sorry, Results not found!
                                <img src={noResults} width={"50%"} alt='No results found' />
                            </span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Explore;
