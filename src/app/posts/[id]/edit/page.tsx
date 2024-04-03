"use client";

import { getOldPost, updatePost } from "@/actions";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

interface EditPageInterface {
  params: {
    id: string;
  };
}
export default function EditPage(props: EditPageInterface) {
  const [oldPost, setOldPost] = useState<{
    id: number;
    title: string;
    description: string;
  } | null>(null);

  const id = parseInt(props.params.id);

  const [editFormState, editFormAction] = useFormState(updatePost, {
    message: "",
    id,
  });

  const getOldData = async () => {
    const post = await getOldPost(id);
    setOldPost(post);
  };

  useEffect(() => {
    getOldData();
  }, []);

  return (
    <section className=" mt-12 md:mt-28 md:w-1/2 mx-auto">
      <h2 className="text-center text-3xl font-bold uppercase">Update Post</h2>
      <p className=" text-center text-sm font-medium text-gray-600">
        update your post here.
      </p>
      {editFormState.message && (
        <p className="text-center bg-red-600 text-white py-1 mt-4">
          {editFormState.message}
        </p>
      )}
      <form className="mt-6" action={editFormAction}>
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
