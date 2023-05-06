import Hero from "@/components/Hero";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { authUser } from "../context/auth-context";
import Feed from "@/components/Feed";
import db from "./api/db";

export default function Home({ data }: any) {
  const { token }: any = authUser();

  return (
    <div className="bg-[#222831]">
      <div>
        <NavBar token={token} />
      </div>
      {token ? <Feed data={data} /> : <Hero />}
    </div>
  );
}

export async function getStaticProps() {
  const response = await db.get("/getPosts");
  return {
    props: { data: response.data }, // will be passed to the page component as props
  };
}
