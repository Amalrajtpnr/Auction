/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import NavBar from "../../components/NavBar";
import { IoIosPeople } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { MdAvTimer } from "react-icons/md";
import PriceCard from "../../components/priceCard";
import { GetServerSideProps } from "next";
import { Axios } from "../../config/AxiosConfig";
import { useRouter } from "next/router";

function ROOM({ roomId }: { roomId: any }) {
  const router = useRouter();

  const [auction, setAuction] = useState<any>({});
  const [activeBidder, setactiveBidder] = useState<any>("");
  const [seconds, setSeconds] = useState(0);
  const [remainingTime, setRemainingTime] = useState<any>(auction.endingTime);

  // useEffect(() => {
  //   if (seconds > 0) {
  //     const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [seconds]);

  useEffect(() => {
    getAuction();
  }, [activeBidder]);

  const getAuction = async () => {
    const res = await Axios.get(`/rooms/${roomId}`);
    const data = await res.data;
    if (!data.error) {
      setAuction(data);
      setRemainingTime(new Date(data.endingTime).getTime() - Date.now());
    } else {
      setAuction({});
      router.replace("/dashboard");
    }
  };

  const getInterval = async () => {
    setInterval(async () => {
      const res = await Axios.get(`/rooms/${roomId}`);
      const data = await res.data;
      if (!data.error) {
        setSeconds(
          Math.floor(26 - (Date.now() - data.timestamp) / 1000) < 0
            ? 0
            : Math.floor(26 - (Date.now() - data.timestamp) / 1000)
        );
      } else {
        setRemainingTime(0);
      }
      getActive();
    }, 1000);
  };

  const getActive = async () => {
    // setInterval(async () => {
    const res = await Axios.get(`/rooms/bidder/${roomId}`);
    const data = await res.data;
    setactiveBidder(data.activeBidder);
    // }, 2000);
  };

  useEffect(() => {
    console.log(new Date("06/04/2023 16:25").getTime())
    console.log('difference : ',new Date().getTime() - Date.now())
    getAuction();
    // getActive();
    getInterval();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime: number) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const displayHours = Math.floor(remainingTime / 3600);
  const displayMinutes = Math.floor((remainingTime % 3600) / 60);
  const displaySeconds = remainingTime % 60;

  return (
    <Layout>
      <div className="h-screen fixed top-0 right-0 left-0 bg-transparent flex flex-col justify-start items-center overflow-y-scroll scrollbar-hide">
        <NavBar />
        <div className="w-full h-full flex flex-row items-center justify-center overflow-y-scroll scrollbar-hide pb-6 pl-6">
          <div className="w-[25%] h-full flex flex-col justify-start items-start ">
            <img
              className="w-[100%] h-[68%] rounded-md"
              src={auction?.productDetails?.imageUrl}
              alt=""
            />
            <h1 className="text-white text-[30px] font-semibold">
              {auction?.productDetails?.name}
            </h1>
            <h1 className="text-white text-[15px] font-light ">
              {auction?.productDetails?.description}
            </h1>
            <h1 className="text-[#00FF66] text-[30px] font-semibold mt-1 mb-1">
              Rs. {auction?.currentBidPrice}
            </h1>
            <div className="w-[70%] h-[10%] flex flex-row justify-start items-center ">
              <div className="w-[50%] h-full flex flex-col justify-start items-start ">
                <h1 className="text-white text-[14px] font-normal ">
                  Participants
                </h1>
                <div className="w-full h-[50%] flex flex-row items-center justify-start">
                  <IoIosPeople className="w-[20%] h-[70%]" color="white" />

                  <h1 className="text-white text-[14px] font-normal ml-2">
                    {auction?.participants?.length < 10
                      ? "0" + auction?.participants?.length
                      : auction?.participants?.length}
                    /{auction?.maximumParticipants}
                  </h1>
                </div>
              </div>
              {/* <div className="w-[50%] h-full flex flex-col justify-start items-start ">
                <h1 className="text-white text-[14px] font-normal ">
                  Spectators
                </h1>
                <div className="w-full h-[50%] flex flex-row items-center justify-start">
                  <BsPerson className="w-[15%] h-[60%]" color="white" />

                  <h1 className="text-white text-[14px] font-normal ml-2">
                    60/60
                  </h1>
                </div>
              </div> */}
            </div>
            <h1 className="text-[#F9BF30] text-[14px] font-semibold ">
              Ends in {displayHours} Hours {displayMinutes} min {displaySeconds}{" "}
              sec
            </h1>
          </div>
          <div className="w-[40%] h-full flex flex-col justify-start items-center ">
            <div className="relative w-[80%] h-full bg-[#263149] rounded-[10px] flex flex-col justify-start items-center ">
              <div className="flex flex-col items-center justify-start w-full h-[86%] overflow-y-scroll scrollbar-hide">
                {auction?.participants?.map((participant: any, i: number) => (
                  <div
                    key={i}
                    className="flex flex-col h-auto w-full items-center justify-center"
                  >
                    <PriceCard
                      participant={participant}
                      index={Math.round(auction?.participants?.length % 10)}
                    />
                    <div className="w-[90%] h-[1px] bg-[#959292]"></div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-3 w-[90%] h-[18%] flex flex-row items-center justify-between  mt-2">
                <div className="w-[60%] h-full grid grid-cols-3 gap-x-2  gap-y-5">
                  <div className="min-w-[35%] min-h-[30%] rounded-[10px] flex flex-col items-center justify-center bg-[#43516F] ">
                    <h1 className="text-white text-[14px] font-normal ">
                      Rs. 100
                    </h1>
                  </div>
                  <div className="min-w-[35%] min-h-[30%] rounded-[10px] flex flex-col items-center justify-center bg-[#43516F] ">
                    <h1 className="text-white text-[14px] font-normal ">
                      Rs. 200
                    </h1>
                  </div>{" "}
                  <div className="min-w-[35%] min-h-[30%] rounded-[10px] flex flex-col items-center justify-center bg-[#43516F] ">
                    <h1 className="text-white text-[14px] font-normal ">
                      Rs. 500
                    </h1>
                  </div>{" "}
                  <div className="min-w-[35%] min-h-[30%] rounded-[10px] flex flex-col items-center justify-center bg-[#43516F] ">
                    <h1 className="text-white text-[14px] font-normal ">
                      Rs. 1000
                    </h1>
                  </div>{" "}
                  <div className="min-w-[35%] min-h-[30%] rounded-[10px] flex flex-col items-center justify-center bg-[#43516F] ">
                    <h1 className="text-white text-[14px] font-normal ">
                      Rs. 2000
                    </h1>
                  </div>
                  <div className="min-w-[35%] min-h-[30%] rounded-[10px] flex flex-col items-center justify-center bg-[#43516F] ">
                    <h1 className="text-white text-[14px] font-normal ">
                      Rs. 5000
                    </h1>
                  </div>
                </div>
                <div className="w-[28%] h-full flex flex-col justify-start items-center ">
                  <div className="w-full h-[45%] flex flex-col justify-center items-center rounded-[10px] bg-[#4080FF] ">
                    <h1 className="text-white text-[14px] font-semibold ">
                      Skip
                    </h1>
                  </div>
                  <div className="w-full h-[20%] flex flex-row items-center justify-center mt-2">
                    <MdAvTimer className="w-[20%] h-[100%]" color="white" />
                    <span className="text-gray-400 ml-2 font-[700] text-[0.75rem] ">
                      {seconds} s{" "}
                      <span className="text-[0.65rem] font-normal">
                        remaining
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ROOM;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { roomId } = context.params!;

  return {
    props: {
      roomId,
    },
  };
};
