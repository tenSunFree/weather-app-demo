import React, { useState } from "react";
import WeatherInfoPanel from "./WeatherInfoPanel";
import WeatherControlPanel from "./WeatherControlPanel";

function WeatherCard({ weather }) {
  if (!weather) return null; // 資料未載入前不顯示卡片

  console.log(
    "WeatherCard, weather: ",
    JSON.stringify(weather.result, null, 2)
  );
  const [selectedDistrict, setSelectedDistrict] = useState("");
  return (
    <div className="bg-[#1A67B1] flex w-[335px] aspect-[503/463] rounded-[10px] px-4 text-white font-sans shadow-lg">
      {/* 左側控制面板 */}
      <WeatherControlPanel />

      <div className="w-[16px]" />

       {/* 只傳入 tmr 資料 */}
      <WeatherInfoPanel data={weather.result.tdy} />
    </div>
  );
}

export default WeatherCard;
