import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ContentWrapper from "./ContentWrapper";


import Carousel from "./Carousel";
// import useFetch from "../../../hooks/useFetch";

const Recommendation = () => {
    // const [data, setData] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    // const { data, loading, error } = useFetch(
    //     `/${mediaType}/${id}/recommendations`
    // );

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:9292/api/anime/recommendation/${id}`);
                const responseData = response.data.data; // Extract the data array from the response
                setRecommendations(responseData);
                // console.log(data);
                console.log("Recommendations", responseData);
            } catch (error) {
                console.error(error);
                fetchRecommendations();
            } finally {
                setLoading(false);
            }
        }
        fetchRecommendations();
    }
        , [id]);



    return (
        <ContentWrapper>
            {recommendations && recommendations.length > 0 && (
                <Carousel
                    title="Recommendations"
                    data={recommendations.map(item => item.entry)}
                />
            )}
        </ContentWrapper>
    );
};

export default Recommendation;