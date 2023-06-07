/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from '../styles/Home.module.css'

function PriceCard({
  participant,
  index,
  isActive,
  isHighest,
}: {
  participant: any;
  index: number;
  isHighest?: boolean;
  isActive?: boolean;
}) {
  const colors = [
    "#FF5733",
    "#FF9633",
    "#FFD733",
    "#A8FF33",
    "#20F10F",
    "#0FF180",
    "#0FE4F1",
    "#0F49F0",
    "#670FF0",
    "#B60FF0",
    "#F0374B",
  ];

  return (
    <div className="relative w-[90%] min-h-[70px] h-[13%] flex flex-row justify-between items-center pl-5 box-border ">
      {isActive && (
        <div className={`${styles.active} absolute left-0 top-0 bottom-0 m-auto min-h-[10px] min-w-[10px] max-h-[10px] max-w-[10px] rounded-[2px] bg-[#F9BF30] `}></div>
      )}
      <div className="w-[32%] h-full flex flex-row justify-between items-center">
        {participant?.image ? (
          <img
            className={`min-h-[40px] min-w-[40px] max-w-[40px] rounded-full ${
              isHighest ? "border-[3px] border-[#00FF66] " : "border-none"
            } `}
            src={participant?.image}
            alt=""
          />
        ) : (
          <div
            style={{
              backgroundColor: colors[index],
            }}
            className={`min-h-[40px] min-w-[40px] rounded-full flex items-center justify-center ${
              isHighest ? "border-[3px] border-[#00FF66] " : "border-none"
            } `}
          >
            <span className="text-black font-bold text-[1.2rem]">
              {participant?.userName?.charAt(0)}
            </span>
          </div>
        )}
        <h1
          className={`${
            isHighest ? "text-green-500" : "text-white "
          } text-[16px] font-semibold`}
        >
          {participant?.userName}
        </h1>
      </div>

      {participant?.bidAmount > 0 ? (
        <h1 className="text-[#00FF66] text-[18px] font-semibold mt-1 mb-1">
          Rs. {participant?.bidAmount}
        </h1>
      ):(
        <h1 className="text-white text-[0.8rem] font-semibold mt-1 mb-1">
          Not Bidded
        </h1>
      )}
    </div>
  );
}

export default PriceCard;
