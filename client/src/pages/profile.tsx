import React, { useEffect, useState } from "react";
import db from "./api/db";
import { parseCookies } from "nookies";

const Profile = () => {
  const cookies = parseCookies();
  const token = cookies.token;
  const [error, setError] = useState(null);
  const [userData, setUserData]: any = useState({});
  useEffect(() => {
    (async () => {
      try {
        const response = await db.post(
          "/profile",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setUserData(data);
      } catch (err: any) {
        setError(err.response.data.error.message);
      }
    })();
  }, []);
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return (
    <div>
      <div>Profile</div>
      {!error ? (
        <div>
          <h1>{userData.email}</h1>{" "}
        </div>
      ) : (
        <div>
          <h1>{error}</h1>
        </div>
      )}
    </div>
  );
};

export default Profile;
