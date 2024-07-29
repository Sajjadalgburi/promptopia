"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const router = useRouter();

  // fetching posts made by user
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    // only once we have the users id from the session then we may fetch the posts
    if (session?.user.id) fetchPosts();
  }, []);

  const handleDelete = async (post) => {
    // the confirm method is built into the broswer and gives a boolean value
    // passed on if the user agrees or not. this is similar to alret!
    const hasConfirmed = confirm(
      "Are you sure you want yo delete this amazing prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filtredPosts = posts.filter((p) => p._id !== posts._id);
        setPosts(filtredPosts);
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
