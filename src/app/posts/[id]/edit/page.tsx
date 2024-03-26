import { db } from "@/db";
import { notFound, redirect } from "next/navigation";

interface EditPageInterface {
  params: {
    id: string;
  };
}
export default async function EditPage(props: EditPageInterface) {
  const id = parseInt(props.params.id);

  const oldPost = await db.post.findFirst({
    where: { id },
  });

  if (!oldPost) {
    return notFound();
  }

  const updatePost = async (formData: FormData) => {
    "use server";

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    await db.post.update({
      where: { id },
      data: {
        title,
        description,
      },
    });

    redirect("/");
  };

  return (
    <section className=" mt-12 md:mt-28 md:w-1/2 mx-auto">
      <h2 className="text-center text-3xl font-bold uppercase">Update Post</h2>
      <p className=" text-center text-sm font-medium text-gray-600">
        update your post here.
      </p>
      <form className="mt-6" action={updatePost}>
        <div className=" mb-4">
          <label htmlFor="title" className=" text-lg font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className=" block focus:none outline-none border-2 border-gray-600 w-full p-2"
            defaultValue={oldPost?.title}
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
            defaultValue={oldPost?.description}
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white text-center w-full py-4 mt-4 text-lg font-bold"
        >
          Update
        </button>
      </form>
    </section>
  );
}
