import React, { useState } from "react";

function LikedArts() {
  const [likedArts, setLikedArts] = useState([
    {
      id: 1,
      imageURL:
        "https://i.seadn.io/s/production/efe387b8-616a-4af2-945a-c94afbd1d4b2.png?w=500&auto=format",
      name: "Product 1",
      floor: "2.4",
      volume: "2",
    },
    {
      id: 2,
      imageURL:
        "https://opensea.io/static/images/learn-center//how-to-create-nft.png ",
      name: "Product 2",
      floor: "2.4",
      volume: "2",
    },
    {
      id: 3,
      imageURL:
        "https://i.seadn.io/s/production/efe387b8-616a-4af2-945a-c94afbd1d4b2.png?w=500&auto=format",
      name: "Product 1",
      floor: "2.4",
      volume: "2",
    },
    {
      id: 4,
      imageURL:
        "https://opensea.io/static/images/learn-center//how-to-create-nft.png ",
      name: "Product 2",
      floor: "2.4",
      volume: "2",
    },
    {
      id: 5,
      imageURL:
        "https://i.seadn.io/s/production/efe387b8-616a-4af2-945a-c94afbd1d4b2.png?w=500&auto=format",
      name: "Product 1",
      floor: "2.4",
      volume: "2",
    },
    {
      id: 6,
      imageURL:
        "https://opensea.io/static/images/learn-center//how-to-create-nft.png ",
      name: "Product 2",
      floor: "2.4",
      volume: "2",
    },
  ]);

  const handleUnlike = (artId) => {
    const updatedLikedArts = likedArts.filter((art) => art.id !== artId);
    setLikedArts(updatedLikedArts);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl text-white font-semibold mb-4">Liked Arts </h2>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mt-10">
  {likedArts?.map((art) => (
    <div key={art.id} className="relative rounded-lg shadow-lg bg-white">
      <img
        className="rounded-t-lg object-cover h-48 w-full"
        src={art.imageURL}
        alt={`Collection - ${art.name}`}
      />

      <div className="rounded-lg p-4">
        <div className="flex gap-1 pb-2">
          <h5 className="text-gray-900 text-lg font-semibold mb-3">
            {art.name}
          </h5>
          <button
            className="px-4 ml-9 rounded-lg bg-red-500 text-white"
            onClick={() => handleUnlike(art.id)}>
            Unlike
          </button>
        </div>

        {/* Modified classes for grid-cols */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-gray-700 text-sm mb-1">Floor</p>
            <p className="text-gray-900 text-lg font-bold">{art.floor}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-700 text-sm mb-1">Volume</p>
            <p className="text-gray-900 text-lg font-bold">
              {art.volume}
            </p>
          </div>
        </div>
        {/* End of modified classes */}
      </div>
    </div>
  ))}
</div>

    </div>
  );
}

export default LikedArts;