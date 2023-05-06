import React, { useEffect, useState } from "react";
import db from "./api/db";
import { authUser } from "@/context/auth-context";

const Profile = () => {
  const { userAuth, token }: any = authUser();
  const [data, setData] = useState({});

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

          setData(response.data);

          console.log(`Data: ${data.email}`);
        })();
      } catch (err) {
        console.log(err as Error);
      }
    }
  }, [token]);
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;
