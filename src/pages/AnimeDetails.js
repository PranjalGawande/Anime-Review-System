import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AnimeDetailsBanner from '../components/AnimeDetailsBanner';
import Characters from '../components/Characters';
import Recommendation from '../components/Recommendation';
import Staffs from '../components/Staffs';
import ReviewSection from '../components/ReviewSection';


const AnimeDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [stats, setStats] = useState([]);
  const [details, setDetails] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [staff, setStaff] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // const statsResponse = axios.get(`http://localhost:9292/api/anime/anime-stats/${id}`);
  // console.log("Stats response", statsRespons);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const [
  //         statsResponse,
  //         detailsResponse,
  //         charactersResponse,
  //         staffResponse,
  //         recommendationsResponse
  //       ] = await Promise.all([
  //         axios.get(`http://localhost:9292/api/anime/anime-stats/${id}`),
  //         axios.get(`http://localhost:9292/api/anime/details/${id}`),
  //         axios.get(`http://localhost:9292/api/anime/characters-list/${id}`),
  //         axios.get(`http://localhost:9292/api/anime/staff-list/${id}`),
  //         axios.get(`http://localhost:9292/api/anime/recommendation/${id}`)
  //       ]);

  //       const statsData = statsResponse.data.data;
  //       // console.log("Stats data", statsData);
  //       const detailsData = detailsResponse.data.data;
  //       console.log("Details data", detailsData);
  //       const charactersData = charactersResponse.data.data;
  //       console.log("Characters data", charactersData);
  //       const staffData = staffResponse.data.data;
  //       console.log("Staff data", staffData);
  //       const recommendationsData = recommendationsResponse.data.data;
  //       console.log("Recommendations", recommendationsData);


  //       // if (!statsData || !charactersData || !staffData) {
  //       //   throw new Error('Some required API responses are undefined');
  //       // }

  //       setData({
  //         stats: statsData,
  //         details: detailsData,
  //         characters: charactersData,
  //         staff: staffData,
  //         recommendations: recommendationsData
  //       });

  //       // console.log("Data", data);

  //       setLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //       setLoading(false);
  //       // setTimeout(fetchData, 3000);
  //     }
  //   };

  //   fetchData();
  // }, [id]);


  // const fetchAnimeDetails = async () => {
  //   setLoading(true);
  //   console.log("useEffect")
  //   try {
  //     const response = await axios.get(`http://localhost:9292/api/anime/details/${id}`);
  //     const data = response?.data?.data;
  //     console.log("Anime details", data);
  //     if (!data) {
  //       throw new Error('Some required API responses are undefined');
  //     }
  //     setDetails(data);
  //   } catch (error) {
  //     console.error(error);
  //     fetchAnimeDetails();
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // const fetchAnimeCharacters = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`http://localhost:9292/api/anime/characters-list/${id}`);
  //     const data = response?.data?.data;
  //     console.log("Anime characters", data);
  //     if (!data) {
  //       throw new Error('Some required API responses are undefined');
  //     }
  //     setCharacters(data);
  //   } catch (error) {
  //     console.error(error);
  //     fetchAnimeCharacters();
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // const fetchAnimeStaff = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`http://localhost:9292/api/anime/staff-list/${id}`);
  //     const data = response?.data?.data;
  //     console.log("Anime staff", data);
  //     if (!data) {
  //       throw new Error('Some required API responses are undefined');
  //     }
  //     setStaff(data);
  //   } catch (error) {
  //     console.error(error);
  //     fetchAnimeStaff();
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // const fetchAnimeRecommendations = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`http://localhost:9292/api/anime/recommendation/${id}`);
  //     const data = response?.data?.data;
  //     console.log("Anime recommendations", data);
  //     if (!data) {
  //       throw new Error('Some required API responses are undefined');
  //     }
  //     const first15Recommendations = data.slice(0, 15);
  //     setRecommendations(first15Recommendations);
  //   } catch (error) {
  //     console.error(error);
  //     fetchAnimeRecommendations();
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // const fetchStats = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`http://localhost:9292/api/anime/anime-stats/${id}`);
  //     const data = response?.data?.data;
  //     console.log("Anime stats", data);
  //     if (!data) {
  //       throw new Error('Some required API responses are undefined');
  //     }
  //     setStats(data);
  //   } catch (error) {
  //     console.error(error);
  //     fetchStats();
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   fetchAnimeDetails();
  //   fetchAnimeCharacters();
  //   fetchAnimeStaff();
  //   fetchAnimeRecommendations();
  //   fetchStats();
  // }
  //   , [id]);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch anime details
        const detailsResponse = await axios.get(`http://localhost:9292/api/anime/details/${id}`);
        setDetails(detailsResponse.data.data);
  
        // Introduce a delay of 1 second before fetching characters list
        await new Promise(resolve => setTimeout(resolve, 500));
  
        // Fetch characters list
        const charactersResponse = await axios.get(`http://localhost:9292/api/anime/characters-list/${id}`);
        setCharacters(charactersResponse.data.data);
  
        // Introduce a delay of 1 second before fetching staff list
        await new Promise(resolve => setTimeout(resolve, 500));
  
        // Fetch staff list
        const staffResponse = await axios.get(`http://localhost:9292/api/anime/staff-list/${id}`);
        setStaff(staffResponse.data.data);
  
        // Introduce a delay of 1 second before fetching recommendations
        await new Promise(resolve => setTimeout(resolve, 500));
  
        // Fetch recommendations
        const recommendationsResponse = await axios.get(`http://localhost:9292/api/anime/recommendation/${id}`);
        const first15Recommendations = recommendationsResponse.data.data.slice(0, 15);
        setRecommendations(first15Recommendations);
  
        // Introduce a delay of 1 second before fetching stats
        await new Promise(resolve => setTimeout(resolve, 500));
  
        // Fetch stats
        const statsResponse = await axios.get(`http://localhost:9292/api/anime/anime-stats/${id}`);
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
      <ReviewSection  loading={loading} />
      <Recommendation data={recommendations} loading={loading} />
    </div>
  )
}

export default AnimeDetails