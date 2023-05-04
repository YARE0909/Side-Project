import React, { useEffect, useState } from "react";
import db from "./api/db";
import { parseCookies } from "nookies";
import { authUser } from "@/context/auth-context";

const Profile = () => {
  const { userAuth, token } = authUser();

  useEffect(() => {
    userAuth();
  }, []);
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;
