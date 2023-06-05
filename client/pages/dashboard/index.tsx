import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import NavBar from "../../components/NavBar";
import Card from "../../components/Card";
import { MdContentCopy } from "react-icons/md";
import { useRouter } from "next/router";
import { Axios } from "../../config/AxiosConfig";

function Home() {
  const router = useRouter();
  const [liveAuctions, setLiveAuctions] = useState<any[]>([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState<any[]>([]);

  const getAuctions = async () => {
    const res = await Axios.get("/rooms");
    const data = await res.data;
    setLiveAuctions(
      data.filter((item: any) => {
        return (
          new Date(item.startingTime).getTime() < Date.now() &&
          new Date(item.endingTime).getTime() > Date.now()
        );
      })
    );
    setUpcomingAuctions(
      data.filter(
        (item: any) => new Date(item.startingTime).getTime() > Date.now()
      )
    );
  };

  useEffect(() => {
    getAuctions();
  }, []);

  return (
    <Layout>
      <div className="h-screen fixed right-0 left-0 bg-transparent flex flex-col justify-start items-center overflow-y-scroll scrollbar-hide pb-6">
        <NavBar />
        <div className="w-[70%] min-h-[15%] flex flex-row justify-between items-center  ">
          <div className="w-[40%] h-full  flex flex-col justify-around items-center ">
            <div className="w-full h-[25%] flex flex-col items-start justify-center">
              <h1 className="text-white text-[18px] font-semibold ">
                Create a local auction with your people
              </h1>
            </div>

            <div className="w-full h-[40%]  flex flex-row justify-between items-center">
              <div className="w-[70%] h-full  bg-[#43516F] rounded-[10px] flex flex-row justify-between items-center px-4">
                <h1 className="text-white text-[15px] font-normal">
                  jger78ghasd67
                </h1>
                <MdContentCopy color="white" size={20} />
              </div>{" "}
              <div className="w-[25%] h-full  bg-[#4080FF] rounded-[10px] flex flex-row justify-center items-center">
                <h1 className="text-white text-[15px] font-normal">
                  Set auction
                </h1>
              </div>
            </div>
            <div className="w-full h-[10%] flex flex-col items-start justify-start">
              <h1 className="text-white text-[12px] font-normal ">
                Copy and share this code to your friends to join
              </h1>
            </div>
          </div>
          <div className="w-[3px] h-[95%] bg-white rounded-[10px]"></div>
          <div className="w-[35%] h-full flex flex-col justify-around items-center ">
            <div className="w-full h-[25%] flex flex-col items-start justify-start">
              <h1 className="text-white text-[18px] font-semibold ">
                Join local auction with code
              </h1>
            </div>

            <div className="w-full h-[40%]  flex flex-row justify-between items-center ">
              <div className="w-[100%] h-full  bg-[#43516F] rounded-[10px] flex flex-row justify-between items-center px-1 ">
                <h1 className="text-white text-[15px] font-normal ml-2">
                  Eg : jger78ghasd67
                </h1>
                <div className="w-[18%] h-[85%]  bg-[#4080FF] rounded-[10px] flex flex-row justify-center items-center">
                  <h1 className="text-white text-[15px] font-normal">Join</h1>
                </div>
              </div>{" "}
            </div>
            <div className="w-full h-[10%] flex flex-col items-start justify-start">
              <h1 className="text-white text-[12px] font-normal ">
                Paste code and join in local auction
              </h1>
            </div>
          </div>
        </div>

        <div className="w-full h-[45%] flex flex-col items-center justify-center">
          <div className="w-[70%] h-[20%]  flex flex-row items-center justify-between  ">
            <h1 className="text-white text-[24px] font-semibold ">
              Live Auctions
            </h1>{" "}
            {liveAuctions.length > 5 && (
              <h1 className="text-white text-[15px] font-semibold underline underline-offset-2">
                more
              </h1>
            )}
          </div>
          <div className="w-[70%] h-[80%]  flex flex-row justify-between items-center mt-2">
            {liveAuctions.map((auction, i) => (
              <Card key={i} auction={auction} />
            ))}
            {/* <Card />
            <Card />
            <Card /> */}
          </div>
        </div>
        {upcomingAuctions.length > 0 && (
          <div className="w-full h-[45%] flex flex-col items-center justify-center mt-7 ">
            <div className="w-[70%] h-[20%]  flex flex-row items-center justify-between  ">
              <h1 className="text-white text-[24px] font-semibold ">
                Upcoming Auctions
              </h1>{" "}
              <h1 className="text-white text-[15px] font-semibold underline underline-offset-2">
                more
              </h1>
            </div>
            <div className="w-[70%] h-[80%]  flex flex-row justify-between items-center mt-3 ">
              {upcomingAuctions.map((auction, i) => (
                <Card key={i} auction={auction} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Home;
