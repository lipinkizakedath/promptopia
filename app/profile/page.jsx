'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@app/components/Profile';

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPost, setMyPosts] = useState([]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const confirmDelete = confirm(
      'Are you sure you wanted to delete this prompt?'
    );

    if (confirmDelete) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredPost = myPost.filter((p) => p._id !== post._id);
        setMyPosts(filteredPost);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const resp = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await resp.json();
      setMyPosts(data);
    };

    console.log(session);

    if (session?.user.id) fetchPost();
  }, [session]);

  return (
    <Profile
      name="My"
      desc="Weclome to your personalized page"
      data={myPost}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
