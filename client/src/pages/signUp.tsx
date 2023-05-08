import { useRouter } from "next/router";
import React, { useState } from "react";
import db from "./api/db";
import { setCookie } from "nookies";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
    displayName: "",
  });

  const [error, setError]: any = useState(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = {
        email: (event.currentTarget.elements[2] as HTMLInputElement).value,
        password: (event.currentTarget.elements[3] as HTMLInputElement).value,
        userName: (event.currentTarget.elements[0] as HTMLInputElement).value,
        displayName: (event.currentTarget.elements[1] as HTMLInputElement)
          .value,
      };
      console.log(formData);
      const response = await db.post("/signup", {
        email: formData.email,
        password: formData.password,
        userName: formData.userName,
        displayName: formData.displayName,
      });
      setError(false);
      const token = await response.data.token;
      setCookie(null, "token", token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      router.push("/");
    } catch (err: any) {
      if (!err.response) {
        setError("Something went wrong please try again later");
      } else {
        setError(err.response.data);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="w-full min-h-screen h-full flex flex-col gap-20 items-start justify-center bg-[#222831] text-white">
      <div className="pl-12">
        <h1 className="text-8xl lg:text-9xl text-[#fcda05] font-bold">
          chirp.
        </h1>
      </div>
      <div className="w-fit h-fit flex flex-col justify-center items-center gap-14 rounded-lg p-8 pl-20">
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center items-start gap-3 scale-[1.25]"
        >
          <div>
            <div className="input-container w-full">
              <input
                onChange={handleChange}
                type="text"
                name="userName"
                required
                pattern="^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
              />
              <label className="block mb-2 text-sm font-bold text-white">
                Username
              </label>
            </div>
            <div className="input-container w-full">
              <input
                onChange={handleChange}
                type="text"
                name="displayName"
                required
                pattern="^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
              />
              <label className="block mb-2 text-sm font-bold text-white">
                Display Name
              </label>
            </div>
            <div className="input-container w-full">
              <input
                onChange={handleChange}
                type="email"
                name="email"
                required
              />
              <label className="block mb-2 text-sm font-bold text-white">
                Email
              </label>
            </div>
            <div className="input-container w-full">
              <input
                onChange={handleChange}
                type="password"
                name="password"
                required
              />
              <label className="block mb-2 text-sm font-bold text-white">
                Password
              </label>
            </div>
            <button
              type="submit"
              className="border-[#fcda05] text-[#fcda05] font-bold border-2 rounded-lg pl-4 pr-4 pt-2 pb-2 hover:bg-[#fcda05] hover:text-[#b767ff] duration-300"
            >
              Sign Up
            </button>
          </div>
          <div className="flex flex-col h-[30px] gap-5 pt-4">
            <Link
              href="/signIn"
              className="text-xs font-bold text-[#fffbe0] hover:text-[#b767ff] duration-300"
            >
              Existing user? Log in!
            </Link>
            <div className="align-bottom">
              {!error ? null : (
                <div>
                  <h1 className="text-red-500 text-xs font-bold p-0 m-0">
                    {error}
                  </h1>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
