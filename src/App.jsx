import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WeatherHeader from "./components/WeatherHeader";
import StrongWindAlert from "./components/WarningBanner";
import WeatherCard from "./components/WeatherCard";
import WeatherCardDualPanel from "./components/WeatherCardDualPanel";
import ic_content from "./assets/images/ic_content.png";

function App() {
  const [query, setQuery] = useState({ q: "keelung" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = () => {
      const message = query.q ? query.q : "current location.";
      console.log("App, useEffect, fetchWeather2");
      console.log("App, useEffect, getFormattedWeatherData, query: ", query);
      console.log("App, useEffect, getFormattedWeatherData, units: " + units);
      getFormattedWeatherData({ ...query, units })
        .then((data) => {
          console.log("App, useEffect, getFormattedWeatherData, data: ", data);
          if (!data) {
            throw new Error("No data returned from the API");
          }
          setWeather(data);
        })
        .catch((error) => {
          console.log(
            "App, useEffect, getFormattedWeatherData, error.message: " +
              error.message
          );
          toast.error("Error fetching weather data: " + error.message);
        });
    };
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";
    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <WeatherHeader />
      <StrongWindAlert />
      <div className="bg-[#3C8FD1FF] relative w-full overflow-hidden">
        <img
          src={ic_content}
          alt="背景圖"
          className="w-full h-auto object-cover z-0"
        />
        <div className="bg-[#00000030] absolute inset-0 z-10 p-4">
          <div className="h-[39px]" />
          <div className="flex items-center">
            <div className="w-[50px]" />
            <WeatherCard weather={weather} />
            <div className="w-[7px]" />
            <WeatherCardDualPanel weather={weather} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
