import React, { useEffect, useState } from 'react'
import ContentWrapper from './ContentWrapper'
import Carousel from './Carousel'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SeasonPopular = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9292/api/anime/current-season');
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
                fetchData();
            }
        };
        fetchData();
    }, []);

    const handleViewMore = () => {
        // Navigate to the ViewMore page when button is clicked
        navigate('/viewmore/current-season');
    };

    return (
        <div className='carouselPopularSeason'>
            <ContentWrapper>
                <span className='carouselTitle'>POPULAR THIS SEASON</span>
                <button className="cta" onClick={handleViewMore}>
                    <span>View More</span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                </button>
            </ContentWrapper>
            <Carousel data={data?.data} />
        </div>
    )
}

export default SeasonPopular