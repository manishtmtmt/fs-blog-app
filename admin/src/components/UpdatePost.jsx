import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost, updatePost } from "../api/post";
import { useNotification } from "../context/NotificationProvider";
import NotFound from "./NotFound";
import PostForm, { defaultPost } from "./PostForm";

const UpdatePost = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();

  const fetchPost = async () => {
    const { error, post } = await getPost(slug);
    if (error) {
      setNotFound(true);
      return updateNotification("error", error);
    }

    setPostInfo({ ...post, tags: post.tags?.join(", ") });
  };

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, post } = await updatePost(postInfo.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    setPostInfo({ ...post, tags: post.tags?.join(", ") });
  };

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (notFound) return <NotFound />;
  return (
    <PostForm
      title="Update Post"
      busy={busy}
      initialPost={postInfo}
      onSubmit={handleSubmit}
      postBtnTitle="Update"
      resetAfterSubmit
    />
  );
};

export default UpdatePost;
