"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import { set } from "mongoose";

const CreatePrompt = () => {
  const [subitting, setSubmitting] = useState(false);

  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPost = async () => {};

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
