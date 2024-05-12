import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LazyloadImg from './LazyloadImg'
import ContentWrapper from './ContentWrapper'


const Banner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const searchQueryHandler = (event) => {
        if (event.key === 'Enter' && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    const searchButtonClickHandler = () => {
        if (query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9292/api/anime/background-images');
                const data = response.data;
                const randomIndex = Math.floor(Math.random() * data.length);
                setBackground(data[randomIndex]);
                setLoading(false);
            } catch (error) {
                fetchData();
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className='banner'>
            {!loading &&
                <div className="background-img">
                    <LazyloadImg src={background} />
                </div>}

            <div className="opacity-layer"></div>

            <ContentWrapper>
                <div className='banner-content'>
                    <span className='title'>ANIMIX</span>
                    <span className='subTitle'>Anime series and movies to discover. Explore Now.</span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder='Search for anime series and movies...'
                            onChange={(event) => setQuery(event.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button onClick={searchButtonClickHandler}>Search</button>
                    </div>
                </div>
            </ContentWrapper>


        </div>
    )
}

export default Banner