import { db } from "@/db";
import Link from "next/link";

export default async function Posts() {
  const posts = await db.post.findMany();

  return (
    <section className=" grid grid-cols-1 md:grid-cols-2 gap-3">
      {posts.map((post) => (
        <div key={post.id} className=" border border-black p-3">
          <h4 className=" font-bold text-2xl uppercase tracking-wide mb-2">
            {post.title}
          </h4>
          <Link
            href={`/posts/${post.id}`}
            className=" p-1 bg-black text-sm text-white font-medium"
          >
            read more
          </Link>
          <p className="mt-2 tracking-widest">
            {post.description.substring(0, 200)} ...
          </p>
        </div>
      ))}
    </section>
  );
}
