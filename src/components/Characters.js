import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

// import "./style.scss";

import ContentWrapper from "./ContentWrapper";
// import Img from "../../../components/lazyLoadImage/Img";
import avatar from "./assets/avatar.jpg";
import LazyloadImg from "./LazyloadImg";

const Characters = () => {
    const [charactersData, setCharactersData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchCharacters = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:9292/api/anime/characters-list/${id}`);
                const charactersData = response.data.data;
                console.log(charactersData);
                setCharactersData(charactersData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCharacters();
    }, [id]);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="CharactersSection">
            <ContentWrapper>
                <div className="sectionHeading">Characters</div>
                {!loading ? (
                    <div className="listItems">
                        {charactersData.map((item) => {
                            let Image_url = item.character.images.jpg.image_url ? item.character.images.jpg.image_url : avatar;
                            return (
                                <div 
                                    key={item.id}
                                    className="listItem"
                                >
                                    <div className="profileImg">
                                        <LazyloadImg src={Image_url} />
                                    </div>
                                    <div className="name">
                                        {item.character.name}
                                    </div>
                                    <div className="character">
                                        {item.role}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="CharactersSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Characters;