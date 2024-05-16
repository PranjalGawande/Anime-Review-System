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

const WatchList = () => {
    const [data, setData] = useState([]);
    // const [data, setData] = useState(null);
    // const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    // const [genresData, setGenresData] = useState(null);
    const [genre, setGenre] = useState([]);
    const [sortby, setSortby] = useState(null);
    // const { mediaType } = useParams();
    const navigate = useNavigate();
    const [noRefresh, setNoRefresh] = useState(false);
    const location = useLocation();
    const genresData = location.state?.genresData;
    const type = useParams().type;
    const token = sessionStorage.getItem('token');

    const fetchData = async () => {
        setLoading(true);
        try {
            const header = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get(`http://localhost:9292/getWatchList`,
                { headers: header }
            );
            setData(response.data.data);
            console.log("watchlist response", response);
            setLoading(false);
        }
        catch (error) {
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
                    <div className="pageTitle">
                        My Watchlist
                    </div>
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {data.length > 0 ? (
                            <div className="content">
                                {
                                    data.map((item, index) => {
                                        return (
                                            <AnimeCard key={index} data={item} type={"WatchList"} />
                                        )
                                    })
                                }
                                
                            </div>
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

export default WatchList;
