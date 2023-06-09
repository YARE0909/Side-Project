import { authUser } from "@/context/auth-context";
import React, { useEffect, useState } from "react";
import { BiHeart, BiComment } from "react-icons/bi";
import { MdPostAdd } from "react-icons/md";
import { formatDistanceStrict } from "date-fns";

const Feed = ({ data, likePost, getLikePostLikeCount, getUser }: any) => {
  function getRelativeTime(date: Date) {
    const past = new Date(date);
    const formattedTime = formatDistanceStrict(past, new Date(), {
      addSuffix: true,
      roundingMethod: "floor",
    });
    return formattedTime; // prints something like "4 days ago"
  }
  function format(_number: any): string {
    const formattedNumber = new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(_number);
    return formattedNumber;
  }
  return (
    <div className="w-full min-h-screen h-full bg-bg flex flex-col justify-start items-center text-[#ffffff]">
      <div>
        <div className="p-4 pt-12 fixed bg-bg w-full flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold pb-6">Chirps</h1>
          </div>
        </div>
        <div className="mt-28 overflow-hidden">
          {data ? (
            data
              .map((item: any, key: any) => {
                const [likeCount, setLikeCount] = useState(null);
                const [likeState, setLikeState] = useState(false);

                useEffect(() => {
                  (async () => {
                    const likeCount = await getLikePostLikeCount(item.id);
                    const user = await getUser();
                    for (let i = 0; i < likeCount.length; i++) {
                      if (likeCount[i].userId === user.id) setLikeState(true);
                    }
                    setLikeCount(likeCount.length);
                  })();
                }, [likeCount]);
                return (
                  <div key={key}>
                    <div className="w-[90vw] max-w-[600px] h-fit flex flex-col rounded-lg border-2 border-gray-500 m-4 p-4">
                      <div className="flex items-center gap-1">
                        <h1 className="text-base text-gray-300 font-bold ">
                          {item.author.userName}
                        </h1>
                        <h1 className="text-sm font-semibold text-gray-500">
                          @{item.author.displayName}
                        </h1>
                      </div>

                      <div className="break-words">
                        <h1 className="text-2xl font-bold">{item.title}</h1>
                      </div>
                      <div className="break-words mt-3">
                        <h1 className="text-sm font-semibold text-white">
                          {item.content}
                        </h1>
                      </div>
                      <div className="mt-6 flex justify-between gap-5">
                        <div>
                          <h1 className="text-sm font-semibold text-gray-500">
                            {getRelativeTime(item.createdAt)}
                          </h1>
                        </div>
                        <div className="flex gap-8 pr-2">
                          <div
                            className={
                              likeState
                                ? "text-red-600 hover:text-gray-300 duration-300 cursor-pointer flex justify-center items-center"
                                : "text-gray-300 hover:text-red-600 duration-300 cursor-pointer flex justify-center items-center"
                            }
                            onClick={async () => {
                              await likePost(item.id);
                              const likeCount = await getLikePostLikeCount(
                                item.id
                              );
                              setLikeCount(likeCount.length);
                              setLikeState(!likeState);
                            }}
                          >
                            <BiHeart className="font-bold text-xl" />
                            <h1>{format(likeCount)}</h1>
                          </div>
                          <div className="text-gray-300 hover:text-blue-600 duration-300 cursor-pointer flex justify-center items-center">
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
