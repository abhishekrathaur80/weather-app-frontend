import { CiSearch } from "react-icons/ci";
import React, { useState } from "react";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";

import classes from "./WeatherInput.module.css";

const WeatherInput = ({ onFetchData ,onForeCastData  }) => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [foreCastData, setForeCastData] = useState([]);
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

      const { lat, lon } = data.coord;

      const foreCastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      setWeatherData(data);
      setForeCastData(foreCastResponse.data);

      onFetchData(weatherData);
      onForeCastData(foreCastData);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
