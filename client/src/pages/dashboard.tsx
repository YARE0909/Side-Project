import { useRouter } from "next/router";
import React, { useEffect } from "react";

const dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signIn");
    }
  }, []);

  return <div>dashboard</div>;
};

export default dashboard;
