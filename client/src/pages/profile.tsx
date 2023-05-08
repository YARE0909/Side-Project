import React, { useEffect, useState } from "react";
import db from "./api/db";
import { authUser } from "@/context/auth-context";
import Image from "next/image";
import NavBar from "@/components/NavBar";

const Profile = () => {
  const { userAuth, token }: any = authUser();
  const [data, setData] = useState({
    email: "",
    userName: "",
    displayName: "",
  });

  useEffect(() => {
    const auth = userAuth();
    if (auth && token) {
      try {
        (async () => {
          const response = await db.get("/profile", {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          setData((d) => ({
            ...d,
            email: response.data.email,
            userName: response.data.userName,
            displayName: response.data.displayName,
          }));
        })();
      } catch (err) {
        console.log(err as Error);
      }
    }
  }, [token]);
  return (
    <div className="w-full min-h-screen h-full bg-bg">
      <div>
        <NavBar token />
      </div>
      <div className="w-full h-full gap-5 flex flex-col justify-start items-center pt-48">
        <div>
          <Image
            width={300}
            height={300}
            src="https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top"
            alt={data.userName}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col gap-1 justify-center items-center">
            <h1 className="text-4xl font-bold text-[#ffffff]">
              {data.displayName}
            </h1>
            <h1 className="text-xl font-bold text-gray-400">
              @{data.userName}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
