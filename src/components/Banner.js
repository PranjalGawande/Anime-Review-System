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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJoYXJpQGdtYWlsLmNvbSIsImlhdCI6MTcxMzAwOTg3OCwiZXhwIjoxNzEzMDI3ODc4fQ.GfyFOhkKolZ4cOkmQb27CbQGtTvxVHIJQCUy9W82Gomp87kZTRslUFra7vMqht4w'; // Replace 'your_auth_token_here' with your actual token
                const response = await axios.get('http://localhost:9292/api/anime/background-images', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = response.data;
                const randomIndex = Math.floor(Math.random() * data.length);
                setBackground(data[randomIndex]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className='banner'>
            {!loading && <div className="background-img">
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
                            <button>Search</button>
                        </div>
                    </div>
            </ContentWrapper>


        </div>
    )
}

export default Banner