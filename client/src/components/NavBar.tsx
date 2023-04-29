import Link from "next/link";
import React from "react";
import Router from "next/router";
import { destroyCookie } from "nookies";

const NavBar = ({ token }: any) => {
  return (
    <div className="w-full h-[110px] rounded-lg p-4">
      <div className="w-full h-full rounded-lg bg-[#12a5ea] flex justify-between items-center p-4">
        <div>
          <h1 className="text-5xl font-bold text-white">Brand.</h1>
        </div>
        <div className="flex justify-evenly items-center gap-4 text-xl font-bold text-white">
          {token ? (
            <div
              onClick={() => {
                destroyCookie(null, "token");
                Router.reload();
              }}
            >
              <h1 className="hover:text-white/50 cursor-pointer duration-300">
                Sign Out
              </h1>
            </div>
          ) : (
            <Link href="/signIn">
              <h1 className="hover:text-white/50 cursor-pointer duration-300">
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
