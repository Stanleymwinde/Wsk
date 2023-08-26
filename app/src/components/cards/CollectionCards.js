import React from "react";
import { Link } from "react-router-dom";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";

function CollectionCards() {

    

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 px-8 gap-1">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 px-1 gap-2">
          <div className="relative rounded-lg shadow-md bg-white mx-auto h-48 w-96 transition-transform transform scale-100 hover:scale-105">
         

            <Link to="/single-collection">
              <img
                className="rounded-t-lg object-cover h-28 w-full"
                src="https://i.seadn.io/gae/FBO6vfVx1DsBER60kO0vL-r7fouTI--iQkFMKLf3E8Vqa5SIksIvFg9_vHGM1iY6IAoKgYrxuwgB8AePWonriD02oi_ri3ZbVRuRi9I?auto=format&dpr=1&h=500"
                alt="Product"
              />
            </Link>

            <div className="absolute bottom-12 left-2 ">
              <img
                className="h-14 w-14 rounded-full border-2 border-green-500"
                src="https://i.seadn.io/gae/FBO6vfVx1DsBER60kO0vL-r7fouTI--iQkFMKLf3E8Vqa5SIksIvFg9_vHGM1iY6IAoKgYrxuwgB8AePWonriD02oi_ri3ZbVRuRi9I?auto=format&dpr=1&h=500"
                alt="Icon"
              />
            </div>

            <div className="pl-20 ">
              <div className="flex items-center">
                <h5 className="text-gray-900 text-md pt-1 pl-2">
                  Collection Name
                </h5>

                <AiFillStar className="text-yellow-500 text-sm ml-2" />

                <Link to="/collection-link">
                  <AiOutlineHeart className="text-red-500 text-sm ml-2 cursor-pointer" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg">
              <div className="flex gap-3 pl-20 ">
                <div className="text-center">
                  <p className="text-gray-700 text-sm">Floor</p>
                  <p className="text-gray-900 text-lg">45 k</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-700 text-sm">Volume</p>
                  <p className="text-gray-900 text-lg">67 k</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionCards;
