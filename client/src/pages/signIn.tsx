import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import db from "./api/db";
import { parseCookies, setCookie } from "nookies";

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
      router.push("/");
    }
  }, []);
  return (
    <div className="w-full min-h-screen h-full flex items-center justify-center bg-[#081c29] text-white">
      <div className="w-fit h-fit flex justify-center items-center gap-14 bg-[#12a5ea] rounded-lg p-8">
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center items-start gap-5"
        >
          <div className="input-container w-full">
            <input onChange={handleChange} type="email" name="email" required />
            <label className="block mb-2 text-sm font-medium text-white">
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
            <label className="block mb-2 text-sm font-medium text-white">
              Password
            </label>
          </div>
          <button
            type="submit"
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden font-medium text-bg rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-bg text-white font-bold rounded-md group-hover:bg-opacity-0">
              Login
            </span>
          </button>
          {!error ? null : (
            <div>
              <h1 className="text-red-600">{error}</h1>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
