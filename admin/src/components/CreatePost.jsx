import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/post";
import { useNotification } from "../context/NotificationProvider";
import PostForm, { defaultPost } from "./PostForm";

const CreatePost = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { updateNotification } = useNotification();
  const [busy, setBusy] = useState(false);
  const [resetAfterSubmit, setResetAfterSubmit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, post } = await createPost(data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    setResetAfterSubmit(true);
    navigate(`/update-post/${post.slug}`);
  };

  useEffect(() => {
    const result = localStorage.getItem("blogPost");
    if (!result) return;

    const oldPost = JSON.parse(result);

    setPostInfo({ ...defaultPost, ...oldPost });
  }, []);
  return (
    <PostForm
      title="Create New Post"
      onSubmit={handleSubmit}
      initiaPost={postInfo}
      busy={busy}
      postBtnTitle="Post"
      resetAfterSubmit={resetAfterSubmit}
    />
  );
};

export default CreatePost;
