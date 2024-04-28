import axios from 'axios';
import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import AnimeDetailsBanner from '../components/AnimeDetailsBanner';
import Characters from '../components/Characters';
import Recommendation from '../components/Recommendation';


const AnimeDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  

  // const fetchAnimeDetails = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`http://localhost:9292/api/anime/characters-list/${id}`);
  //     const data = await response.json();
  //     setData(data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <div>
      <AnimeDetailsBanner />
      <Characters />
      <Recommendation />
    </div>
  )
}

export default AnimeDetails