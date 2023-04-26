import Hero from "@/components/Hero";
import db from "./api/db";
import { useEffect, useState } from "react";

export default function Home() {
  const [result, setResult]: any = useState(null);

  const getResult = async () => {
    const response = await db.get(`/`);
    console.log(response.data);
    setResult(response.data);
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
