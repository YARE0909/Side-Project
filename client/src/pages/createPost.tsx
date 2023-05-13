import React, { useEffect, useState } from "react";
import { authUser } from "@/context/auth-context";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import db from "./api/db";
import { useRouter } from "next/router";

const CreatePost = () => {
  const { userAuth, token }: any = authUser();
  const [error, setError]: any = useState(null);
  const router = useRouter();

  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = {
        title: (event.currentTarget.elements[0] as HTMLInputElement).value,
        content: (event.currentTarget.elements[1] as HTMLInputElement).value,
      };
      console.log(formData);
      setError(false);

      const response = await db.post(
        "/post",
        {
          title: formData.title,
          content: formData.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        router.push("/");
      }
    } catch (err: any) {
      if (!err.response) {
        setError("Something went wrong please try again later");
      } else {
        setError(err.response.data.error);
      }
    }
  };

  useEffect(() => {
    userAuth();
  }, []);
  return (
    <div className="w-full min-h-screen h-full bg-bg text-white flex flex-col justify-center items-center">
      <div>
        <NavBar token />
      </div>

      <div className="p-4 bg-transparent w-fit flex justify-center items-center">
        <div>
          <h1 className="text-2xl lg:text-4xl font-bold pb-6">
            What do you wanna chirp?
          </h1>
        </div>
      </div>
      <div className="w-full h-full gap-5 flex flex-col justify-start items-center">
        <div className="w-full h-fit flex flex-col justify-center items-center gap-14 rounded-lg p-8 lg:pl-20">
          <form
            onSubmit={handleLogin}
            className="flex w-full lg:w-[50vw] flex-col justify-center items-start gap-3"
          >
            <div className="w-full h-fit rounded-lg border-gray-400 border-4 p-6 flex flex-col gap-5">
              <div>
                <input
                  onChange={handleChange}
                  type="text"
                  name="title"
                  required
                  className="w-full bg-bg pl-4 pr-4 pt-2 pb-2 text-2xl font-bold"
                  placeholder="Title"
                />
              </div>
              <hr />
              <div>
                <textarea
                  onChange={handleChange}
                  name="content"
                  required
                  className="w-full bg-bg pl-4 pr-4 pt-2 pb-2 text-2xl font-semibold resize-none h-44"
                  placeholder="Content"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="border-[#fcda05] text-[#fcda05] font-bold border-2 rounded-lg pl-4 pr-4 pt-2 pb-2 hover:bg-[#fcda05] hover:text-[#b767ff] duration-300"
                >
                  Post
                </button>
              </div>
            </div>
            <div className="flex flex-col h-[30px] gap-5 pt-4">
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
    </div>
  );
};

export default CreatePost;
