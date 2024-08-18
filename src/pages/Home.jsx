import React, { useContext } from "react";
import { TbCoinTakaFilled } from "react-icons/tb";
import { ResponseContext } from "../hooks/ResponseContext";

const Home = () => {
  const { responseData } = useContext(ResponseContext);
  console.log("Response Data:", responseData);

  return (
    <div classNameName="container mx-auto min-h-[calc(100vh-120px)] ">
      <section className="px-5 w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm-grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-16 mt-5 mb-5">
        {responseData &&
          responseData.map((data) => (
            <div
              key={data._id}
              className="w-64  bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
            >
              <a href="#">
                <img
                  src={data.image}
                  className="h-44 w-72 object-scale-down rounded-t-xl"
                />
                <div className="px-4 py-3 w-72">
                  <div className="">
                    <span className="text-gray-400 mr-3 uppercase text-xs">
                      {data.brand}
                    </span>
                    <span className="badge badge-success text-white text-xs gap-3">
                      {data.availability}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-black truncate block capitalize">
                    {data.name}
                  </p>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">
                      <span className="flex items-center gap-1 font-bold">
                        {data.price} <TbCoinTakaFilled />
                      </span>
                    </p>

                    <del>
                      <p className="text-sm text-gray-600 cursor-auto ml-2">
                        {data.price + 500}
                      </p>
                    </del>
                  </div>
                </div>
              </a>
            </div>
          ))}
      </section>
    </div>
  );
};

export default Home;
