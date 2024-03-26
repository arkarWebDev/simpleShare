import { db } from "@/db";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface PostDetailsInterFace {
  params: {
    id: string;
  };
}
export default async function PostDetails(props: PostDetailsInterFace) {
  await new Promise((r) => setTimeout(r, 2000));

  const id = parseInt(props.params.id);

  const post = await db.post.findFirst({
    where: { id },
  });

  if (!post) {
    return notFound();
  }

  const deletePost = async () => {
    "use server";

    await db.post.delete({
      where: { id },
    });

    redirect("/");
  };

  return (
    <div>
      <div className="flex justify-between mb-2 flex-col md:flex-row">
        <h1 className="text-4xl font-bold tracking-wider mb-2 uppercase">
          {post?.title}
        </h1>
        <div className=" space-x-3">
          <Link
            href={`/posts/${post.id}/edit`}
            className="text-white bg-black p-3"
          >
            Edit
          </Link>
          <form action={deletePost} className=" inline">
            <button className="text-white bg-black p-2">Delete</button>
          </form>
        </div>
      </div>
      <p className=" font-medium tracking-wider">{post?.description}</p>
    </div>
  );
}
