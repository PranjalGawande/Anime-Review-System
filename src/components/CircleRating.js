import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


const CircleRating = ({ rating }) => {
    return (
        <div className="circleRating">
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating ? rating : "N/A"}
                styles={buildStyles({
                    strokeLinecap: "butt",
                    textSize: "30px",
                    textColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    );
};

export default CircleRating;