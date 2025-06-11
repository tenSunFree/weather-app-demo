import { DateTime } from "luxon";
import { getTimezoneIdByCoords } from "./getTimezoneIdByCoords.js";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const getCurrentWeatherData = (infoType, searchParams) => {
  const url = new URL(`${BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`Error ${response.status}: ${text}`);
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Unable to retrieve weather data:", error);
      throw error;
    });
};

export const formatToLocalTime = (
  secs,
  zone = "UTC",
  format = "cccc, dd LLL yyyy | hh:mm a"
) => {
  return DateTime.fromMillis(secs * 1000)
    .setZone(zone)
    .toFormat(format);
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const getFormattedWeatherData = async (searchParams) => {
  const currentWeather = await getCurrentWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);
  const { lat, lon } = currentWeather;
  const timezoneId = await getTimezoneIdByCoords(lat, lon);
  const forecastData = await getCurrentWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  });
  const result = processForecastData(forecastData);
  const hourly = forecastData.list.slice(0, 6).map((d) => ({
    dt: d.dt,
    temp: d.main.temp,
    icon: d.weather[0].icon,
    timezone: timezoneId,
  }));
  const daily = forecastData.list
    .filter((_, idx) => idx % 8 === 0)
    .map((d) => ({
      dt: d.dt,
      temp: d.main.temp,
      icon: d.weather[0].icon,
      timezone: timezoneId,
    }));
  return { ...currentWeather, hourly, daily, timezone: timezoneId, result };
};

const processForecastData = (forecastData) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);
  const groups = {
    tdy: [],
    tmr: [],
    dat: [],
  };
  forecastData.list.forEach((item) => {
    const itemDate = new Date(item.dt_txt);
    itemDate.setHours(0, 0, 0, 0);
    if (itemDate.getTime() === today.getTime()) {
      groups.tdy.push(item);
    } else if (itemDate.getTime() === tomorrow.getTime()) {
      groups.tmr.push(item);
    } else if (itemDate.getTime() === dayAfterTomorrow.getTime()) {
      groups.dat.push(item);
    }
  });

  const calculate = (items) => {
    if (items.length === 0) {
      return {
        maxTemp: null,
        minTemp: null,
        firstIcon: null,
        averageHumidity: null,
      };
    }
    let maxTemp = -Infinity;
    let minTemp = Infinity;
    let humiditySum = 0;
    const iconCount = {};
    items.forEach((item) => {
      const temp = item.main.temp;
      const humidity = item.main.humidity;
      const icon = item.weather[0].icon;
      if (temp > maxTemp) maxTemp = temp;
      if (temp < minTemp) minTemp = temp;
      humiditySum += humidity;
      if (iconCount[icon]) {
        iconCount[icon]++;
      } else {
        iconCount[icon] = 1;
      }
    });
    let mostFrequentIcon = null;
    let maxCount = 0;
    for (const icon in iconCount) {
      if (iconCount[icon] > maxCount) {
        mostFrequentIcon = icon;
        maxCount = iconCount[icon];
      }
    }
    return {
      maxTemp: Number(maxTemp.toFixed(2)),
      minTemp: Number(minTemp.toFixed(2)),
      firstIcon: mostFrequentIcon,
      averageHumidity: Number((humiditySum / items.length).toFixed(2)),
    };
  };
  return {
    tdy: calculate(groups.tdy),
    tmr: calculate(groups.tmr),
    dat: calculate(groups.dat),
  };
};

export const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
