import Hero from "@/components/Hero";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { parseCookies} from "nookies";

export default function Home() {
  const router = useRouter();
  const [token, setToken]: any = useState(null);
  useEffect(() => {
    const cookies = parseCookies();
    setToken(cookies.token);
  }, []);
  return (
    <div className="w-full min-h-screen h-full bg-[#222831]">
      <NavBar token={token} />
      <Hero />
    </div>
  );
}
