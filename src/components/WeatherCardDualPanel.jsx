import React, { useState } from "react";
import WeatherInfoPanel from "./WeatherInfoPanel";
import WeatherControlPanel from "./WeatherControlPanel";

function WeatherCardDualPanel({ weather }) {
  if (!weather) return null; // 資料未載入前不顯示卡片 

  const [selectedDistrict, setSelectedDistrict] = useState("");
  return (
    <div className="bg-[#1A67B1] flex w-[335px] aspect-[503/463] rounded-[10px] px-4 text-white font-sans shadow-lg">
      <WeatherInfoPanel data={weather.result.tmr} />

      {/* 垂直分隔線，左右各 8px 間距 */}
      <div
        className="w-px h-full bg-white opacity-50"
        style={{ marginLeft: "8px", marginRight: "8px" }}
      />

      <WeatherInfoPanel data={weather.result.dat} />
    </div>
  );
}

export default WeatherCardDualPanel;
