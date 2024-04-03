"use server";

import { db } from "@/db";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const createPost = async (
  formState: { message: string },
  formData: FormData
) => {
  const title = formData.get("title");
  const description = formData.get("description");

  if (typeof title !== "string" || title.length < 5) {
    return {
      message: "Title must have at least 5 letters.",
    };
  }

  if (typeof description !== "string" || description.length < 20) {
    return {
      message: "Description must have at least 20 letters.",
    };
  }

  await db.post.create({
    data: {
      title,
      description,
    },
  });

  revalidatePath("/");

  redirect("/");
};

export const getOldPost = async (id: number) => {
  const oldPost = await db.post.findFirst({
    where: { id },
  });

  if (!oldPost) {
    return notFound();
  }

  return oldPost;
};

export const updatePost = async (
  formState: { message: string; id: number },
  formData: FormData
) => {
  const title = formData.get("title");
  const description = formData.get("description");

  if (typeof title !== "string" || title.length < 5) {
    return {
      message: "Title must have at least 5 letters.",
      id: formState.id,
    };
  }

  if (typeof description !== "string" || description.length < 20) {
    return {
      message: "Description must have at least 20 letters.",
      id: formState.id,
    };
  }

  await db.post.update({
    where: { id: formState.id },
    data: {
      title,
      description,
    },
  });

  revalidatePath("/");

  redirect("/");
};
