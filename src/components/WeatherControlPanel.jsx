import React from "react";
import ic_more from "../assets/images/ic_more.png";
import ic_position from "../assets/images/ic_position.png";
import ic_favorites from "../assets/images/ic_favorites.png";
import ic_illustrate from "../assets/images/ic_illustrate.png";

const taipeiDistricts = [
  "松山區",
  "信義區",
  "大安區",
  "中山區",
  "中正區",
  "大同區",
  "萬華區",
  "文山區",
  "南港區",
  "內湖區",
  "士林區",
  "北投區",
];

function WeatherControlPanel({ selectedDistrict, setSelectedDistrict }) {
  return (
    <div className="flex flex-col flex-1 bg-[#1A67B1] py-4">
      {/* 城市 + 日期（左右平行） */}
      <div className="flex bg-[#1A67B1FF] justify-start items-center mb-2">
        <div className="text-lg font-semibold">臺北市</div>
        <div className="w-[20px]" />
        <div className="text-sm font-bold">04/16</div>
      </div>

      <div className="h-[4px]" />

      {/* 左側 2x2 按鈕排列 */}
      <div className="grid bg-[#1A67B1FF] grid-cols-2 gap-x-2 gap-y-2 text-xs">
        <div className="flex flex-col items-center">
          <img src={ic_more} alt="更多" className="h-8 w-8 mb-1" />
          <span>更多</span>
        </div>
        <div className="flex flex-col items-center">
          <img src={ic_position} alt="定位" className="h-8 w-8 mb-1" />
          <span>定位</span>
        </div>
        <div className="flex flex-col items-center">
          <img src={ic_favorites} alt="最愛" className="h-8 w-8 mb-1" />
          <span>最愛</span>
        </div>
        <div className="flex flex-col items-center">
          <img src={ic_illustrate} alt="說明" className="h-8 w-8 mb-1" />
          <span>說明</span>
        </div>
      </div>

      <div className="flex-1" />

      {/* 鄉鎮預報 */}
      <div className="bg-[#00000000]">
        <label className="text-sm">鄉鎮預報</label>
        <div className="mt-1">
          <select
            className="bg-white text-black px-2 py-1 text-sm w-full rounded"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="">選擇鄉鎮</option>
            {taipeiDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          <div className="h-[8px]" />
          <button
            className="bg-[#787878] w-full text-white px-4 py-1 text-sm rounded"
            onClick={() => alert(`選擇了 ${selectedDistrict || "尚未選擇"}`)}
          >
            確定
          </button>
        </div>
      </div>
    </div>
  );
}

export default WeatherControlPanel;
