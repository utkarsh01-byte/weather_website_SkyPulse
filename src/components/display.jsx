import Humidity from "../assets/humidity.png";
import Wind from "../assets/wind.png";
import LoadingSpinner from "./loadingspinner.jsx";
import {
  Clouds,
  Partlycloudynight,
  Cloudywindynight,
  Hot,
  Nightt,
  Partlycloudy,
  Heavyrain,
  Thunder,
  Snow,
  Thunderrain,
} from "./icons.jsx";

import { useEffect, useState } from "react";

const Display = ({ city }) => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  const allIcons = {
    "01d": Hot,
    "01n": Nightt,
    "02d": Partlycloudy,
    "02n": Partlycloudynight,
    "03d": Clouds,
    "03n": Clouds,
    "04d": Cloudywindynight,
    "04n": Cloudywindynight,
    "09d": Heavyrain,
    "09n": Heavyrain,
    "10d": Thunderrain,
    "10n": Thunderrain,
    "11d": Thunder,
    "11n": Thunder,
    "13d": Snow,
    "13n": Snow,
  };

  const API_KEY = import.meta.env.VITE_APP_ID;

  useEffect(() => {
    if (!city) return;
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        const data = await res.json();
        if (data.cod !== 200) {
          setWeatherData(null);
          return;
        }
        const icon = allIcons[data.weather[0].icon] || Hot;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
        });
      } finally {
        console.log("done fetching");
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city, API_KEY]);

  return (
    <div className="display-area fade-in">
      <div className="display-inner">
        {loading && (
          <div className="spinner-wrapper">
            <LoadingSpinner />
          </div>
        )}
        {!loading && weatherData && (
          <>
            <img
              src={weatherData.icon}
              alt="weather icon"
              className="weather-icon"
            />
            <p className="temperature">{weatherData.temperature}°C</p>
            <p className="location">{weatherData.location}</p>

            <div className="data">
              <div className="col">
                <div className="set">
                  <img src={Humidity} alt="" />
                  <div className="humid">
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="set">
                  <img src={Wind} alt="" className="wimg" />
                  <div className="wind">
                    <p>{weatherData.windSpeed}km/h</p>
                    <span>Wind</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Display;
