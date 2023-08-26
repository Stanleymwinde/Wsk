import React from "react";
import { Link } from "react-router-dom";


const Cards = ({ data }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 px-1 gap-5">
      {data.map((product) => (
        <div key={product.id} class="bg-white rounded-lg shadow-md h-48  transform">
                <div class="overflow-hidden rounded-t-lg mx-auto transition-transform transform">
                    <img  src={product.imageURL} class="object-cover object-top h-28 w-full"/>
                </div>
                <div className="rounded-lg">
            <h5 className="text-gray-900 text-md pt-1 pl-2">{product.name}</h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-gray-700 text-sm">Floor</p>
                <p className="text-gray-900 text-lg">{product.floor}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-700 text-sm">Volume</p>
                <p className="text-gray-900 text-lg">{product.volume}</p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-2 bg-white opacity-0 hover:opacity-100 transition-opacity">
              <button className="bg-blue-500 text-white px-1.5 py-1 rounded-md">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}       
    </div>
  );
};

export default Cards;
