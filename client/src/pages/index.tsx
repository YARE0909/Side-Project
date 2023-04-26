import Hero from "@/components/Hero";
import db from "./api/db";
import { useEffect, useState } from "react";
import { headers } from "next/dist/client/components/headers";

export default function Home() {
  const [result, setResult]: any = useState(null);

  const getResult = async () => {
    const response = await db.post(`/signin`, {
      email: "tester@gmail.com",
      password: "gay",
    });
    console.log(response.data);
    setResult(response.data.token);
  };

  useEffect(() => {
    getResult();
  }, []);
  return (
    <div className="w-full min-h-screen h-full bg-[#29272a]">
      <Hero message={result} />
    </div>
  );
}
