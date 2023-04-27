import Hero from "@/components/Hero";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { headers } from "next/dist/client/components/headers";
import NavBar from "@/components/NavBar";

export default function Home() {
  const router = useRouter();
  const [token, setToken]: any = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return (
    <div className="w-full min-h-screen h-full bg-[#081c29]">
      <NavBar token={token} />
      <Hero />
    </div>
  );
}
