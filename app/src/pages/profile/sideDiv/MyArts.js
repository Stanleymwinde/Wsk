import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../middleware/Api";
function MyArts() {
  const [arts, setArts] = useState([]);

  useEffect(() => {
    const getArts = async () => {
      try {
        const response = await api(`/art/get_arts_by_user`, "GET", {}, {});
        setArts(response);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    getArts();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-white font-semibold">My Arts </h2>
        <Link
          to="/create-art"
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <span className="mr-2">Add Arts</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {arts?.map((arts) => (
          <div key={arts.id} className="rounded-lg shadow-lg bg-white h-auto">
            <Link to="/" data-mdb-ripple="true" data-mdb-ripple-color="light">
              <img
                className="rounded-t-lg object-cover h-48 w-full"
                src={arts.image}
                alt={`Art- ${arts.name}`}
              />
            </Link>
            <div className="rounded-lg p-2">
              <h5 className="text-gray-900 text-lg font-semibold pt-2 mb-3">
                {arts.name}
              </h5>
              {/* 
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-gray-700 text-sm mb-1">Floor</p>
                  <p className="text-gray-900 text-lg font-bold">
                    {arts.floor}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-700 text-sm mb-1">Volume</p>
                  <p className="text-gray-900 text-lg font-bold">
                    {arts.volume}
                  </p>
                </div>
              </div>
              */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyArts;
