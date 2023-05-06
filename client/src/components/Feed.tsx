import { authUser } from "@/context/auth-context";
import React, { useEffect, useState } from "react";

const Feed = ({ data }: any) => {
  const { userAuth }: any = authUser();
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    setPostData(data);
    data.map((item: any) => {
      console.log(item.title);
    });
  }, []);
  return (
    <div className="w-full min-h-screen h-full bg-bg flex flex-col justify-start items-center text-[#ffffff] pt-[90px]">
      <div>
        <div className="m-4">
            <h1 className="text-4xl font-bold pb-6">Posts</h1>
        </div>
        {data?.map((item: any, key: any) => {
          return (
            <div key={key}>
              <div className="w-[90vw] max-w-[600px] h-fit flex flex-col rounded-lg border-2 border-[#474747] m-4 p-4 gap-5">
                <div>
                  <h1 className="text-2xl font-bold">{item.title}</h1>
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-white">{item.content}</h1>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
