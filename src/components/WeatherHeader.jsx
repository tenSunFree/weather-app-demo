import React from "react";
import ic_central_weather_bureau from "../assets/images/ic_central_weather_bureau.png";
import shareIcon from "../assets/images/ic_share.png";
import printIcon from "../assets/images/ic_print.png";
import settingIcon from "../assets/images/ic_set_up.png";
import searchIcon from "../assets/images/ic_search.png";
import { useState } from "react"; // 引入 useState 用於狀態管理

function WeatherHeader() {
  const [fontSize, setFontSize] = useState("中"); // 初始是 "中"
  const [showTip, setShowTip] = useState(false); // 額外提示
  return (
    <header className="flex w-full bg-[#187AC8] text-white items-center">
      <div className="bg-[#187AC8] w-[72px]"></div>

      {/* Logo區塊 */}
      <div className="flex items-center mr-8">
        <img
          src={ic_central_weather_bureau}
          alt="中央氣象署Logo"
          className="h-[36px] w-auto mr-2"
        />
        <div>
          <div className="leading-tight  text-[22px] font-light">
            交通部中央氣象署
          </div>
          <div className="leading-tight  text-[12px] font-light">
            Central Weather Administration
          </div>
        </div>
      </div>

      {/* 右側功能區塊 */}
      <div className="bg-[#187AC8] flex-1 mx-4">
        {/* 上層：Logo + 功能列 */}
        <div className="bg-[#187AC8] flex items-center justify-end py-1">
          {/* 回首頁 */}
          <nav className="flex items-center space-x-2 text-sm">
            <span className="flex flex-col items-center leading-none">
              <span className="leading-[1px] text-[10px] tracking-tighter">
                ⋯
              </span>
              <span className="leading-[1px] text-[10px] tracking-tighter -mt-2">
                ⋯
              </span>
            </span>
            <span className="text-[12px] font-light text-white">回首頁</span>
            <span className="font-thin">|</span>
            <span className="text-[12px] font-light text-white">EN</span>
            <span className="font-thin">|</span>
            <span className="text-[12px] font-light text-white">網站導覽</span>
            <span className="font-thin">|</span>
            <span className="text-[12px] font-light text-white">意見箱</span>
            <span className="font-thin">|</span>
            <span className="text-[12px] font-light text-white">常見問答</span>
            <span className="font-thin">|</span>
            <span className="text-[12px] font-light text-white">
              關於氣象署
            </span>
          </nav>

          <div className="bg-[#99881190] w-[12px]"></div>

          {/* 右側按鈕 */}
          <div className="flex items-center space-x-2">
            {/* 小中大字體切換 */}
            {["小", "中", "大"].map((size) => (
              <div key={size} className="relative group">
                <button
                  onClick={() => setFontSize(size)}
                  className={`border border-white px-2 py-1 text-[13px] font-light transition ${
                    fontSize === size
                      ? "bg-white text-[#177DC4]"
                      : "text-white hover:bg-white hover:text-[#177DC4]"
                  }`}
                >
                  {size}
                </button>

                {/* Tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-black text-white text-[11px] rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
                  點此改變網站字級
                </div>
              </div>
            ))}

            <div className="bg-[#99881190] w-[2px]"></div>

            {/* 小圖示按鈕 */}
            <div className="flex items-center space-x-3">
              <img
                src={shareIcon}
                alt="分享"
                className="h-[12px] w-auto cursor-pointer"
              />
              <span className="font-thin">|</span>
              <img
                src={printIcon}
                alt="列印"
                className="h-[12px] w-auto cursor-pointer"
              />
              <span className="font-thin">|</span>
              <img
                src={settingIcon}
                alt="設定"
                className="h-[12px] w-auto cursor-pointer"
              />
              <span className="font-thin">|</span>
              <img
                src={searchIcon}
                alt="搜尋"
                className="h-[12px] w-auto cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 下層：警特報、天氣、地震、海象、氣候、資料、知識與天文、常用服務 */}
        <div className="bg-[#187AC8] flex justify-end space-x-6 text-white text-base py-1 mr-[4px]">
          <span className="cursor-pointer text-[15px] font-light">警特報</span>
          <span className="cursor-pointer text-[15px] font-light">天氣</span>
          <span className="cursor-pointer text-[15px] font-light">地震</span>
          <span className="cursor-pointer text-[15px] font-light">海象</span>
          <span className="cursor-pointer text-[15px] font-light">氣候</span>
          <span className="cursor-pointer text-[15px] font-light">資料</span>
          <span className="cursor-pointer text-[15px] font-light">
            知識與天文
          </span>
          <span className="cursor-pointer text-[15px] font-light">
            常用服務
          </span>
        </div>
      </div>

      <div className="bg-[#187AC8] w-[72px]"></div>
    </header>
  );
}

export default WeatherHeader;
