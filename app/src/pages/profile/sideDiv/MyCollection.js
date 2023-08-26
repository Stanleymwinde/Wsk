import React, { useEffect, useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { Link } from "react-router-dom";
import { api } from "../../../middleware/Api";

function MyCollection() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const getCollections = async () => {
      try {
        const response = await api(
          `/collection/get_collections_by_user`,
          "GET",
          {},
          {}
        );
        setCollections(response.collectionsWithStats);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    getCollections();
  }, []);

  console.log(collections);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-white font-semibold">My Collection</h2>
        <Link
          to="/create-collection"
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <span className="mr-2">Create Collection</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="rounded-lg shadow-lg bg-white h-auto"
          >
            <Link
              to={`/single-collection/${collection.id}`}
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              <img
                className="rounded-t-lg object-cover h-48 w-full"
                src={collection.image}
                alt={`Collection - ${collection.name}`}
              />
            </Link>
            <div className="rounded-lg p-2">
              <h5 className="text-gray-900 text-lg font-semibold pt-2 mb-3">
                {collection.name}
              </h5>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center">
                  <p className="text-gray-700 text-sm mb-1">Floor price</p>
                  <p className="text-gray-900 text-lg font-bold">
                    Ksh {collection.floor_price}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-700 text-sm mb-1">Revenue</p>
                  <p className="text-gray-900 text-lg font-bold">
                    Ksh {collection.total_collection_revenue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyCollection;
