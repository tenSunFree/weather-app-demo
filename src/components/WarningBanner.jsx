import React from "react";
import icStrongWindReport from "../assets/images/ic_strong_wind_report.png";

function StrongWindAlert() {
  return (
    <div className="w-full bg-white flex items-center px-4 py-[16px]">

      {/* 留白 */}
      <div className="w-[74px]" />

      {/* 紅色感嘆號圖示 */}
      <img
        src={icStrongWindReport}
        alt="強風警報圖示"
        className="h-[20px] w-auto mr-2"
      />

      {/* 紅色文字 */}
      <span className="text-red-600 text-sm font-light">陸上強風特報</span>

      {/* 垂直灰色線 */}
      <div className="h-5 border-[1px] border-gray-400 mx-3"></div>
    </div>
  );
}

export default StrongWindAlert;