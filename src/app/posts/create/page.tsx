"use client";

import { useFormState } from "react-dom";
import { createPost } from "@/actions";

export default function Create() {
  const [createFormState, createPostAction] = useFormState(createPost, {
    message: "",
  });

  return (
    <section className="mt-12  md:mt-28 md:w-1/2 mx-auto">
      <h2 className="text-center text-3xl font-bold uppercase">Create Post</h2>
      <p className=" text-center text-sm font-medium text-gray-600">
        create your own new post now.
      </p>
      {createFormState.message && (
        <p className="text-center bg-red-600 text-white py-1 mt-4">
          {createFormState.message}
        </p>
      )}
      <form className="mt-6" action={createPostAction}>
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
