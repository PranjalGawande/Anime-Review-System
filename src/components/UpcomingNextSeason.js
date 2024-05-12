import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContentWrapper from './ContentWrapper'
import Carousel from './Carousel'
import axios from 'axios'

const UpcomingNextSeason = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9292/api/anime/upcoming-anime');
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
        navigate('/viewmore/upcoming-anime');
    };

    return (
        <div className='carouselPopularSeason'>
            <ContentWrapper>
                <span className='carouselTitle'>UPCOMING NEXT SEASON</span>
                <button className="cta" onClick={handleViewMore}>
                    <span>View More</span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                </button>
            </ContentWrapper>
            <Carousel data={data?.data} isUpcoming={true} />
        </div>
    )
}

export default UpcomingNextSeason