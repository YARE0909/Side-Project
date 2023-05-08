import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import { authUser } from "../context/auth-context";
import Feed from "@/components/Feed";
import db from "./api/db";

export default function Home({ data }: any) {
  const { token }: any = authUser();

  const likePost = async (id: any) => {
    await db.post(
      "/post/like",
      {
        postId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const getLikePostLikeCount = async (id: any) => {
    try {
      const response = await db.get("/post/likeCount", {
        params: {
          postId: id,
        },
      });
      return response.data;
    } catch (err) {
      return err;
    }
  };

  return (
    <div className="bg-bg">
      <div>
        <NavBar token={token} />
      </div>
      {token ? (
        <Feed
          data={data}
          likePost={likePost}
          getLikePostLikeCount={getLikePostLikeCount}
        />
      ) : (
        <Hero />
      )}
    </div>
  );
}

export async function getStaticProps() {
  const response = await db.get("/getPosts");
  return {
    props: { data: response.data },
  };
}
