import React, { useState } from 'react';

function FollowActivity() {
  // Sample data for followed users (you can replace this with actual data)
  const [followedUsers, setFollowedUsers] = useState([
    {
      id: 1,
      username: "mohamed",
      profilePicture:  "https://i.seadn.io/s/production/efe387b8-616a-4af2-945a-c94afbd1d4b2.png?w=500&auto=format",
    },
    {
      id: 2,
      username: "lameck",
      profilePicture:  "https://i.seadn.io/s/production/efe387b8-616a-4af2-945a-c94afbd1d4b2.png?w=500&auto=format",
    },
    {
      id: 3,
      username: "stacy",
      profilePicture: "https://i.seadn.io/s/production/efe387b8-616a-4af2-945a-c94afbd1d4b2.png?w=500&auto=format",
    },
    {
      id: 4,
      username: "shiro",
      profilePicture:  "https://i.seadn.io/s/production/efe387b8-616a-4af2-945a-c94afbd1d4b2.png?w=500&auto=format",
    },
    // Add more followed users as needed
  ]);

  const handleUnFollow = (userId) => {
    const updatedFollowedUsers = followedUsers.filter(
      (user) => user.id !== userId
    );
    setFollowedUsers(updatedFollowedUsers);
  };

 return (
  <div className="p-4 min-h-screen">
    <div className="max-w-md mx-auto md:grid">
    <h1 className="text-2xl font-semibold mb-4 text-white">Following</h1>
    <div className="max-w-md mx-auto md:grid md:grid-cols-2 md:gap-4">
      {followedUsers.map((user) => (
        <div
          key={user.id}
          className="md:col-span-1 flex flex-col bg-white shadow-md rounded-lg mb-4 p-4"
        >
          <div className="flex items-center">
            <img
              src={user.profilePicture}
              alt={`${user.username}'s profile`}
              className="w-16 h-16 md:w-12 md:h-12 rounded-full object-cover mb-4 md:mb-0 mr-5 md:mr-4"
            />
            <h2 className="text-lg font-semibold">@{user.username}</h2>
          </div>
          <button
            className="py-2 px-4 rounded-lg bg-red-500 text-white mt-4"
            onClick={() => handleUnFollow(user.id)}
          >
            UnFollow
          </button>
        </div>
      ))}
    </div>
    </div>
  </div>
);

}

export default FollowActivity;
