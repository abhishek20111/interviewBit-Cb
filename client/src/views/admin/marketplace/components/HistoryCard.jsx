import React from "react";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import { FaEthereum } from "react-icons/fa";
import Card from "components/card";

const HistoryCard = ({ userData }) => {
  
  return (
    <Card extra={"mt-3 !z-5 overflow-hidden"}>
      {/* HistoryCard Header */}
      <div className="flex items-center justify-between rounded-t-3xl p-3">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          History
        </div>
      </div>

      {/* History CardData */}
      {userData.slice(0, 7).map((user, index) => (
        <div className="flex h-full w-full items-start justify-between bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700" key={index}>
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center">
              <img
                className="h-[2rem] w-[2rem] rounded-full"
                src={Nft1}
                alt="kll"
              />
            </div>
            <div className="flex flex-col">
              <h5 className="text-base font-bold text-navy-700 dark:text-white">
                {user.name}
              </h5>
              <p className="mt-1 text-sm font-normal text-gray-600">
                {user.preferences.join(", ")}
              </p>
            </div>
          </div>

          {/* Placeholder for price and time */}
          <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
            <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
              <p> {} </p>
              {/* Placeholder for price */}
              <p>XXX{user._id.slice(-4)}</p>
            </div>
            
          </div>
        </div>
      ))}
    </Card>
  );
};

export default HistoryCard;
