import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../middleware/Api";

function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (results.collectionResult?.length > 0) {
      const collection = results.collectionResult[0];
      navigate(`/${collection.id}`);
    } else if (results.userResult?.length > 0) {
      const user = results.userResult[0];
      navigate(`/${user.id}`);
    } else if (results.artResult?.length > 0) {
      const art = results.artResult[0];
      navigate(`/${art.id}`);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await api(`/index/search/${search}`, "GET", {}, {});

      setResults(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (search.length >= 2) {
      fetchData();
    } else {
      setResults({});
    }
  }, [search]);

  return (
    <div className="search-bar hidden lg:flex absolute right-1/3 left-1/3 items-center">
      <form className="w-full max-w-lg">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for Arts, collections, and accounts"
            value={search}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
        {search && (
          <div className="absolute mt-2 bg-white w-full rounded-md border border-gray-300 shadow-lg">
            <div className="">
              {isLoading ? (
                <div className="p-2">
                  <i className=""></i> Loading...
                </div>
              ) : (
                search.length >= 2 && (
                  <div>
                    {Array.isArray(results.collectionResult) &&
                      results.collectionResult.length > 0 && (
                        <div>
                          <span className="block p-2 bg-gray-200">
                            Collections
                          </span>
                          {results.collectionResult.map((result, index) => (
                            <div
                              key={index}
                              className="p-2 border-b border-gray-300 flex items-center"
                            >
                              <img
                                src={result.image}
                                className="w-12 h-12 rounded-full"
                                alt=""
                              />
                              <div className="ml-2 text-lg">
                                <Link
                                  to={`/single-collection/${result.id}`}
                                  className=""
                                >
                                  {result.name}
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                    {Array.isArray(results.userResult) &&
                      results.userResult.length > 0 && (
                        <div>
                          <span className="block p-2 bg-gray-200">Users</span>
                          {results.userResult.map((result, index) => (
                            <div
                              key={index}
                              className="p-2 border-b border-gray-300 flex items-center"
                            >
                              <img
                                src={result.image}
                                className="w-12 h-12 rounded-full"
                                alt=""
                              />
                              <div className="ml-2 text-lg">
                                <Link
                                  to={`/profile-for-user/${result.username}`}
                                  className=""
                                >
                                  {result.username}
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                    {Array.isArray(results.artResult) &&
                      results.artResult.length > 0 && (
                        <div>
                          <span className="block p-2 bg-gray-200">Arts</span>
                          {results.artResult.map((result, index) => (
                            <div
                              key={index}
                              className="p-2 border-b border-gray-300 flex items-center"
                            >
                              <img
                                src={result.image}
                                className="w-12 h-12 rounded-full"
                                alt=""
                              />
                              <div className="ml-2 text-lg">
                                {result.title && (
                                  <Link
                                    to={`/single-art/${result.id}`}
                                    className=""
                                  >
                                    {result.title}
                                  </Link>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Search;
