"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const [subitting, setSubmitting] = useState(false);

  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const session = useSession();
  const router = useRouter();

  const createPost = async (e) => {
    e.preventDefault(); // prevent the normal behaviour of reloading once the form is submitted

    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      subitting={subitting}
      handleSubmit={createPost}
    />
  );
};

export default CreatePrompt;
