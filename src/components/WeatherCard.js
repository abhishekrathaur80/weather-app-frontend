import React, { useState } from "react";
import getWeatherIcon from "../utils";
import classes from "./WeatherCard.module.css";

const WeatherCard = ({ data, onSelectedDay }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    //console.log(data[activeTab]);
    onSelectedDay(data.daily[activeTab]);
  };

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.weatherCard}>
      <div className={classes.tabContainer}>
        {data.daily.map((day, index) => (
          <div
            key={index}
            className={`${classes.tab} ${
              index === activeTab ? classes.active : ""
            }`}
            onClick={() => handleTabClick(index)}
          >
            <div className={classes.weatherInfo}>
              <div className={classes.daySummary}>
                <h2>
                  {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </h2>
                <div className={classes.temperature}>
                  <span style={{ fontWeight: "700" }}> {day.temp.max} °C</span>
                  <span>{day.temp.min} °C</span>
                </div>
                <div className={classes.icon}>
                  {getWeatherIcon(day.weather[0].icon)}
                </div>
                <p>{day.weather[0].description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
