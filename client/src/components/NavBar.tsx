import Link from "next/link";
import React, { useState } from "react";
import Router from "next/router";
import { destroyCookie } from "nookies";
import {
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
  AiOutlinePoweroff,
  AiOutlineLogin,
} from "react-icons/ai";

const NavBar = ({ token }: any) => {
  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const toggleOpenMobile = () => {
    setOpenMobile(!openMobile);
  };
  return (
    <div>
      <div className="w-[25vw] h-screen rounded-lg p-4 fixed lg:flex hidden z-20">
        {open ? (
          <div className="w-full h-full bg-white rounded-l-lg flex flex-col gap-10 items-start justify-between p-4 text-black">
            <div>
              <h1 className="text-6xl font-extrabold">chirp.</h1>
            </div>
            <div className="font-bold text-2xl flex flex-col gap-5 duration-300">
              <div>
                <Link
                  className="hover:drop-shadow-[0px_0px_1.5px_rgba(0,0,0,1)] hover:text-white duration-300"
                  href="/"
                >
                  Home
                </Link>
              </div>
              <div>
                <Link
                  className="hover:drop-shadow-[0px_0px_1.5px_rgba(0,0,0,1)] hover:text-white duration-300"
                  href="/"
                >
                  Your Posts
                </Link>
              </div>
              <div>
                <Link
                  className="hover:drop-shadow-[0px_0px_1.5px_rgba(0,0,0,1)] hover:text-white duration-300"
                  href="/profile"
                >
                  Profile
                </Link>
              </div>
            </div>
          </div>
        ) : null}
        <div className={open ? "w-[90px] h-full rounded-r-lg bg-[#ef564e] flex flex-col justify-between items-center p-4 pr-8 pl-8 text-white":"w-[90px] h-full rounded-lg bg-[#ef564e] flex flex-col justify-between items-center p-4 pr-8 pl-8 text-white"}>
          <div onClick={toggleOpen}>
            {open ? (
              <AiOutlineMenuFold className="text-3xl font-bold cursor-pointer" />
            ) : (
              <AiOutlineMenuUnfold className="text-3xl font-bold cursor-pointer" />
            )}
          </div>
          <div className="flex justify-evenly items-center gap-4 text-xl font-bold text-white">
            {token ? (
              <div
                onClick={() => {
                  destroyCookie(null, "token");
                  Router.reload();
                }}
              >
                <AiOutlinePoweroff className="text-3xl cursor-pointer" />
              </div>
            ) : (
              <Link href="/signIn">
                <AiOutlineLogin className="text-3xl" />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-fit rounded-lg lg:hidden p-4 fixed bottom-0 z-20">
        <div className={openMobile ? "w-full h-[80px] rounded-t-lg bg-[#ef564e] flex justify-between items-center p-4 pr-8 pl-8 text-white":"w-full h-[80px] rounded-lg bg-[#ef564e] flex justify-between items-center p-4 pr-8 pl-8 text-white"}>
          <div onClick={toggleOpenMobile}>
            {openMobile ? (
              <AiOutlineMenuFold className="text-3xl font-bold cursor-pointer" />
            ) : (
              <AiOutlineMenuUnfold className="text-3xl font-bold cursor-pointer" />
            )}
          </div>
          <div className="flex justify-evenly items-center gap-4 text-xl font-bold text-white">
            {token ? (
              <div
                onClick={() => {
                  destroyCookie(null, "token");
                  Router.reload();
                }}
              >
                <AiOutlinePoweroff className="text-3xl cursor-pointer" />
              </div>
            ) : (
              <Link href="/signIn">
                <AiOutlineLogin className="text-3xl" />
              </Link>
            )}
          </div>
        </div>
        {openMobile ? (
          <div className="w-full h-[35vh] bg-white rounded-b-lg flex flex-col justify-between p-4">
            <div>
              <h1 className="text-6xl font-extrabold">chirp.</h1>
            </div>
            <div className="font-bold text-2xl flex flex-col gap-5 duration-300">
              <div>
                <Link
                  className="hover:drop-shadow-[0px_0px_1.5px_rgba(0,0,0,1)] hover:text-white duration-300"
                  href="/"
                >
                  Home
                </Link>
              </div>
              <div>
                <Link
                  className="hover:drop-shadow-[0px_0px_1.5px_rgba(0,0,0,1)] hover:text-white duration-300"
                  href="/"
                >
                  Your Posts
                </Link>
              </div>
              <div>
                <Link
                  className="hover:drop-shadow-[0px_0px_1.5px_rgba(0,0,0,1)] hover:text-white duration-300"
                  href="/profile"
                >
                  Profile
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
