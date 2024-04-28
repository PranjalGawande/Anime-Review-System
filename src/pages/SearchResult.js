import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ContentWrapper from '../components/ContentWrapper'
import InfiniteScroll from 'react-infinite-scroll-component'
// import AnimeCard from '../components/AnimeCard'
// import Spinner from '../components/Spinner'
import noResults from '../components/assets/no-results.png'

const SearchResult = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const { query } = useParams();

    useEffect(() => {
    const fetchSearchResults = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:9292/api/anime/search?q=${query}&page=${pageNum}`);
            const data = response.data;
            setData(data);
            setPageNum((prev => prev + 1));
            setLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    fetchSearchResults();
    }, [query, pageNum]);

    const fetchNextPageData = async () => {
    try {
        const response = await axios.get(`http://localhost:9292/api/anime/search?q=${query}&page=${pageNum}`);
        const data = response.data;
        setData((prevData) => [...prevData, ...data]);
        setPageNum((prev => prev + 1));
    } catch (error) {
        console.error(error);
    }
    }



  return (
    <div className='searchResultsPage'>SearchResult</div>
  )
}

export default SearchResult