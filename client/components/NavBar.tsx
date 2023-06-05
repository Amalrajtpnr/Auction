import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {IoPersonOutline} from "react-icons/io5"

const NavBar = () => {
  return (
    <div className="w-full min-h-[15%] flex flex-col justify-center  items-end ">
      <div className="w-[60%] h-full flex flex-row justify-around items-center ">
        <h1 className="text-white text-[18px] font-semibold">Home</h1>
        <h1 className="text-white text-[18px] font-semibold">Dashboard</h1>
        <h1 className="text-white text-[18px] font-semibold">Guide</h1>
        <h1 className="text-white text-[18px] font-semibold">Contact Us</h1>
        <AiOutlineShoppingCart size={25} color="white" />
        <IoPersonOutline size={25} color="white" />


      </div>
    </div>
  );
};

export default NavBar;
