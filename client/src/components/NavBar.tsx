import Link from "next/link";
import React from "react";
import Router from "next/router";
import { destroyCookie } from "nookies";

const NavBar = ({ token }: any) => {
  return (
    <div className="w-full h-[110px] rounded-lg p-4 fixed">
      <div className="w-full h-full rounded-lg bg-[#fcda05] flex justify-between items-center p-4 pr-8 pl-8">
        <div>
          <h1 className="text-5xl font-bold outline">chirp.</h1>
        </div>
        <div className="flex justify-evenly items-center gap-4 text-xl font-bold text-white">
          {token ? (
            <div
              onClick={() => {
                destroyCookie(null, "token");
                Router.reload();
              }}
            >
              <h1 className="hover:text-black text-[#393e46] cursor-pointer duration-300">
                Sign Out
              </h1>
            </div>
          ) : (
            <Link href="/signIn">
              <h1 className="hover:text-black text-[#393e46] cursor-pointer duration-300">
                Login
              </h1>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
