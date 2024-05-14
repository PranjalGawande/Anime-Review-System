import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ContentWrapper from "./ContentWrapper";


import Carousel from "./Carousel";
// import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ data, loading }) => {
    // const [data, setData] = useState([]);
    // const [data, setdata] = useState([]);
    // const [loading, setLoading] = useState(false);
    const { id } = useParams();
    console.log("data", data);

    // const { data, loading, error } = useFetch(
    //     `/${mediaType}/${id}/data`
    // );

    // useEffect(() => {
    //     const fetchdata = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await axios.get(`http://localhost:9292/api/anime/recommendation/${id}`);
    //             const responseData = response.data.data; // Extract the data array from the response
    //             setdata(responseData);
    //             // console.log(data);
    //             console.log("data", responseData);
    //         } catch (error) {
    //             console.error(error);
    //             fetchdata();
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchdata();
    // }
    //     , [id]);



    return (
        <ContentWrapper>
            {data && data.length > 0 && (
                <Carousel
                    title="Recommendations"
                    data={data.map(item => item.entry)}
                />
            )}
        </ContentWrapper>
    );
};

export default Recommendation;