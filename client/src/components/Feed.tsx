import { authUser } from "@/context/auth-context";
import React, { useEffect, useState } from "react";
import { BiHeart, BiComment } from "react-icons/bi";

const Feed = ({ data }: any) => {
  const { userAuth }: any = authUser();
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    setPostData(data);
    console.log(data);
  }, []);
  return (
    <div className="w-full min-h-screen h-full bg-bg flex flex-col justify-start items-center text-[#ffffff]">
      <div>
        <div className="p-4 fixed bg-bg w-full">
          <h1 className="text-4xl font-bold pb-6">Posts</h1>
        </div>
        <div className="mt-20 overflow-hidden">
          {data ? (
            data
              .map((item: any, key: any) => {
                return (
                  <div key={key}>
                    <div className="w-[90vw] max-w-[600px] h-fit flex flex-col rounded-lg border-2 border-gray-500 m-4 p-4">
                      <div>
                        <h1 className="text-sm font-semibold text-gray-500">
                          <span className="text-base text-gray-300 font-bold ">
                            {item.author.userName}
                          </span>{" "}
                        </h1>
                      </div>

                      <div className="break-words">
                        <h1 className="text-2xl font-bold">{item.title}</h1>
                      </div>
                      <div className="break-words">
                        <h1 className="text-sm font-semibold text-white">
                          {item.content}
                        </h1>
                      </div>
                      <div className="mt-6 flex justify-between gap-5">
                        <div>
                          <h1 className="text-sm font-semibold text-gray-500">
                            {item.createdAt
                              .substring(0, 10)
                              .replaceAll("-", "/")}
                          </h1>
                        </div>
                        <div className="flex gap-5">
                          <div className="text-gray-300 hover:text-red-600 duration-300 cursor-pointer">
                            <BiHeart className="font-bold text-xl" />
                          </div>
                          <div className="text-gray-300 hover:text-blue-600 duration-300 cursor-pointer">
                            <BiComment className="font-bold text-xl" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
              .reverse()
          ) : (
            <div>
              <h1 className="text-2xl font-bold">No posts yet</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
