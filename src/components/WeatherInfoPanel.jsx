import React from "react";
import ic_sunny from "../assets/images/ic_sunny.png";

function WeatherInfoPanel({ data }) {
  if (!data) return null;

  console.log("WeatherInfoPanel, data: ", JSON.stringify(data, null, 2));

  return (
    <div className="bg-[#1A67B1] flex flex-col flex-1 py-4 rounded-[10px]">
      {/* 今日凌晨時間區段 */}
      <div className="text-center text-sm leading-tight mb-2">
        <div className="h-[2px]" />
        <div className="font-light">今日凌晨</div>
        <div className="h-[18px]" />
        <div>00:00~06:00</div>
      </div>

      <div className="flex-1" />

      {/* 右側天氣圖示 */}
      <div className="bg-[#78787800] pr-2 flex justify-center">
        <img src={ic_sunny} alt="天氣圖示" className="w-[94px]" />
      </div>

      <div className="flex-1" />

      {/* 底部：溫度與降雨 */}
      <div className="flex flex-col justify-between items-center mt-4">
        <div className="text-xl font-light">
          {Math.round(data.minTemp)}° - {Math.round(data.maxTemp)}°
        </div>
        <div className="h-[16px]" />
        <div style={{ fontSize: "14px" }}>
          <span
            className="text-white"
            style={{ fontFamily: "Arial, sans-serif", fontSize: "20px" }}
          >
            ☂
          </span>{" "}
          0%
        </div>
      </div>
    </div>
  );
}

export default WeatherInfoPanel;
