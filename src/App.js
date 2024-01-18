import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiLoaderCircle } from "react-icons/bi";

import WeatherInput from "./components/WeatherInput";
import WeatherCard from "./components/WeatherCard";
import CurrentWeather from "./components/CurrentWeather";
import classes from "./App.module.css";

function App() {
  const apiKey = "3ba6f2e607a4063cfdf4f1966d2df482";
  const [WeatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);
  const [daysData, setdaysData] = useState([]);
  const [selectedDayData, setSelectedDayData] = useState();

  const hadleSelectedDay = (data) => {
    console.log(data);
    setSelectedDayData(data);
  };

  const fetchDataHandler = (data) => {
    //console.log(data);
    setWeatherData(data);
  };

  useEffect(() => {
    const fetchWeatherDataByLocation = async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const daysResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );

        setdaysData(daysResponse.data);
        setError(null);
      } catch (error) {
        setError("Unable to fetch weather data for your location.");
        setWeatherData(null);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          fetchWeatherDataByLocation,
          (error) => {
            console.error("Error getting location:", error);
            setError(
              "Unable to fetch your location. Please enter a city name."
            );
          }
        );
      } else {
        setError(
          "Geolocation is not supported by your browser. Please enter a city name."
        );
      }
    };

    getLocation();
  }, []);

  return (
    <div className={classes.container}>
      <WeatherInput onFetchData={fetchDataHandler} />
      {daysData.length === 0 ? (
        <BiLoaderCircle size={100} />
      ) : (
        <WeatherCard data={daysData} onSelectedDay={hadleSelectedDay} />
      )}
      {daysData.length === 0 ? (
        <BiLoaderCircle size={100} color="white" />
      ) : (
        <CurrentWeather todayWeatherData={daysData} />
      )}
    </div>
  );
}

export default App;
