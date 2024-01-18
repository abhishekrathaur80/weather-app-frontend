import { CiSearch } from "react-icons/ci";
import React, { useState } from "react";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";

import classes from "./WeatherInput.module.css";

const WeatherInput = ({ onFetchData }) => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});

  const [hasCityInput, setHasCityInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiKey = "3ba6f2e607a4063cfdf4f1966d2df482";

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setHasCityInput(!!e.target.value);
  };

  const getWeatherData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.data;
      setWeatherData(data);
      setLoading(false);
      onFetchData(weatherData);
    } catch (error) {
      console.log(error);
    }
  };


  const handleSearch = () => {
    getWeatherData();
  };
  

 

  return (
    <div
      className={`${classes.wrapper} ${hasCityInput ? "classes.hasCity" : ""}`}
    >
      <FaLocationDot className={classes.faLocation}  size={25}/>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>
        <CiSearch className={classes.CiSearch} size={35} />
      </button>
    </div>
  );
};

export default WeatherInput;
