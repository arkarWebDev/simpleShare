import { db } from "@/db";
import { notFound } from "next/navigation";

interface PostDetailsInterFace {
  params: {
    id: string;
  };
}
export default async function PostDetails(props: PostDetailsInterFace) {
  await new Promise((r) => setTimeout(r, 2000));

  const post = await db.post.findFirst({
    where: { id: parseInt(props.params.id) },
  });

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-wider mb-2 uppercase">
        {post?.title}
      </h1>
      <p className=" font-medium tracking-wider">{post?.description}</p>
    </div>
  );
}
