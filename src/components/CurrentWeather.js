import React from "react";
import getWeatherIcon from "../utils";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { formatTimestampTo12Hour, formatUnixTimestampToTime } from "../Helper";

import "./CurrentWeather.css";

const CurrentWeather = ({ todayWeatherData  }) => {
 
  console.log(todayWeatherData);

  const numDataPointsToShow = 6;

  const hourlyTempData =
    todayWeatherData?.hourly
      ?.slice(0, numDataPointsToShow)
      .map((hourData) => hourData.temp) || [];
  const xLabels =
    todayWeatherData?.hourly
      ?.slice(0, numDataPointsToShow)
      .map((hourData) => formatTimestampTo12Hour(hourData.dt)) || [];

  return (
    <div className="current-day-container">
      <div className="temperature-container">
        <h1>{todayWeatherData.current.temp } °C</h1>
        <div className="icon-container">
          {getWeatherIcon(todayWeatherData.current.weather[0].icon)}
        </div>
      </div>
      <div className="hourly-chart-container">
        <ChartContainer
          styles={{ color: "red" }}
          width={400}
          height={200}
          series={[
            {
              type: "line",
              label: "temp",
              yAxisId: "leftAxisId",
              data: hourlyTempData,
            },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
        >
          <LinePlot />
          <MarkPlot />
          <ChartsXAxis />
        </ChartContainer>
      </div>
      <div className="pressure-humidity-container">
        <div className="humidity">
          <h3>Pressure</h3>
          <p>{todayWeatherData.current.pressure} hPa</p>
        </div>
        <div className="humidity">
          <h3>Humidity</h3>
          <p>{todayWeatherData.current.humidity}%</p>
        </div>
      </div>
      <div className="sun-chart-container">
        <div className="sunrise">
          <span>
            <h3>Sunrise</h3>
            <h4 style={{ fontWeight: "400" }}>
              {todayWeatherData.current.sunrise
                ? formatUnixTimestampToTime(todayWeatherData.current.sunrise)
                : "N/A"}
            </h4>
          </span>
          <span>
            <h3>Sunset</h3>
            <h4 style={{ fontWeight: "400" }}>
              {todayWeatherData.current.sunset
                ? formatUnixTimestampToTime(todayWeatherData.current.sunset)
                : "N/A"}
            </h4>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
