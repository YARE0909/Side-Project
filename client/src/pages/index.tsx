import Hero from "@/components/Hero";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { parseCookies } from "nookies";
import { authUser } from "../context/auth-context";

export default function Home() {
  const { returnToken } = authUser();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(returnToken);
  }, []);

  return (
    <div className="bg-[#222831]">
      <div>
        <NavBar token={token} />
      </div>
      <div>
        <Hero />
      </div>
    </div>
  );
}
