/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";
import { IoIosPeople } from "react-icons/io";

const Card = ({
 auction
}: {
  auction:any
}) => {
  const router = useRouter();
  const numberOfParticipants = auction.participants.length < 10 ? "0" + auction.participants.length : auction.participants.length

  return (
    <div
      onClick={() => {
        router.push(`/room/${auction.roomId}`);
      }}
      className="w-[200px] min-h-[230px]  rounded-[10px] bg-transparent"
    >
      <img src={auction.productDetails.imageUrl} alt="" />
      <h1 className="text-white text-[14px] font-semibold">{auction.productDetails.name}</h1>
      <div className="w-full h-[10%] flex flex-row items-center justify-between">
        <h1 className="text-[#00FF66] text-[12px] font-normal underline cursor-pointer underline-offset-2">
          Watch live auction
        </h1>
        <div className="w-[30%] h-full  flex flex-row items-center justify-between">
          <h1 className="text-white text-[12px] font-semibold">{numberOfParticipants}/{auction.maximumParticipants}</h1>
          <IoIosPeople color="white" />
        </div>
      </div>
    </div>
  );
};

export default Card;
