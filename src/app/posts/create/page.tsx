import { db } from "@/db";
import { redirect } from "next/navigation";

export default function Create() {
  const createPost = async (formData: FormData) => {
    "use server";

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const post = await db.post.create({
      data: {
        title,
        description,
      },
    });

    console.log(post);

    redirect("/");
  };

  return (
    <section className=" mt-28 w-1/2 mx-auto">
      <h2 className="text-center text-3xl font-bold uppercase">Create Post</h2>
      <p className=" text-center text-sm font-medium text-gray-600">
        create your own new post now.
      </p>
      <form className="mt-6" action={createPost}>
        <div className=" mb-4">
          <label htmlFor="title" className=" text-lg font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className=" block focus:none outline-none border-2 border-gray-600 w-full p-2"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className=" text-lg font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={8}
            className=" block focus:none outline-none border-2 border-gray-600 w-full p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white text-center w-full py-4 mt-4 text-lg font-bold"
        >
          Post
        </button>
      </form>
    </section>
  );
}
