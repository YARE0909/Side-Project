import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import db from "./api/db";
import { parseCookies, setCookie } from "nookies";
import Link from "next/link";

const SignIn = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError]: any = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = {
        email: (event.currentTarget.elements[0] as HTMLInputElement).value,
        password: (event.currentTarget.elements[1] as HTMLInputElement).value,
      };
      const response = await db.post("/signin", {
        email: formData.email,
        password: formData.password,
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
        setError(err.response.data.error);
      }
    }
  };

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;
    if (token) {
      router.push("/profile");
    }
  }, []);
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
              Login
            </button>
          </div>
          <div className="flex flex-col h-[30px] gap-5 pt-4">
            <Link
              href="/signUp"
              className="text-xs font-bold text-[#fffbe0] hover:text-[#b767ff] duration-300"
            >
              New to chirp.? Sign Up!
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

export default SignIn;
