/* eslint-disable @next/next/no-img-element */
import React from "react";

function PriceCard({ participant,index }:{participant:any,index:number}) {

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
    "#F0374B"
]

  return (
    <div className="w-[90%] min-h-[70px] h-[13%] flex flex-row justify-between items-center ">
      <div className="w-[30%] h-full flex flex-row justify-between items-center">
        {
          participant?.image ? (
            <img className="min-h-[40px] min-w-[40px] max-w-[40px] rounded-full" src={participant?.image} alt="" />
          ) : (
            <div style={{
              backgroundColor:colors[index]
            }} className="min-h-[40px] min-w-[40px] rounded-full flex items-center justify-center ">
              <span className="text-black font-bold text-[1.2rem]">{participant?.userName?.charAt(0)}</span>
            </div>
          )
        }
        <h1 className="text-white text-[16px] font-semibold">{participant?.userName}</h1>
      </div>

     {
      participant?.bidAmount > 0 && (
        <h1 className="text-[#00FF66] text-[18px] font-semibold mt-1 mb-1">
        Rs. {participant?.bidAmount}
      </h1>
      )
     }
    </div>
  );
}

export default PriceCard;
