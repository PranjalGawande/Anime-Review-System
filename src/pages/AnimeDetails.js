import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AnimeDetailsBanner from "../components/AnimeDetailsBanner";
import Characters from "../components/Characters";
import Recommendation from "../components/Recommendation";
import Staffs from "../components/Staffs";
import ReviewSection from "../components/ReviewSection";
import API_URL from "../Config/config";

const AnimeDetails = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [stats, setStats] = useState([]);
  const [details, setDetails] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [staff, setStaff] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch anime details
        const detailsResponse = await axios.get(
          `${API_URL}/api/anime/details/${id}`
        );
        setDetails(detailsResponse.data.data);

        await new Promise((resolve) => setTimeout(resolve, 500));

        // Fetch characters list
        const charactersResponse = await axios.get(
          `${API_URL}/api/anime/characters-list/${id}`
        );
        setCharacters(charactersResponse.data.data);

        await new Promise((resolve) => setTimeout(resolve, 500));

        // Fetch staff list
        const staffResponse = await axios.get(
          `${API_URL}/api/anime/staff-list/${id}`
        );
        setStaff(staffResponse.data.data);

        await new Promise((resolve) => setTimeout(resolve, 500));

        // Fetch recommendations
        const recommendationsResponse = await axios.get(
          `${API_URL}/api/anime/recommendation/${id}`
        );
        const first15Recommendations = recommendationsResponse.data.data.slice(
          0,
          15
        );
        setRecommendations(first15Recommendations);

        await new Promise((resolve) => setTimeout(resolve, 500));

        // Fetch stats
        const statsResponse = await axios.get(
          `${API_URL}/api/anime/anime-stats/${id}`
        );
        setStats(statsResponse.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <AnimeDetailsBanner data={details} stats={stats} loading={loading} />
      <Characters data={characters} loading={loading} />
      <Staffs data={staff} loading={loading} />
      {details.status !== "Not yet aired" && (
        <ReviewSection loading={loading} />
      )}
      <Recommendation data={recommendations} loading={loading} />
    </div>
  );
};

export default AnimeDetails;
