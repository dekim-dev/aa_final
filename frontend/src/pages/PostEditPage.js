import PostEditor from "../components/Post/PostEditor";
import { usePostStore } from "../store";

const PostEditPage = () => {
  const postStore = usePostStore();
  const post = postStore.post; // postStore에서 post 값을 가져옵니다.
  console.log(post);

  return (
    <>
      <PostEditor isEdit={true} originalData={post}></PostEditor>
    </>
  );
};
export default PostEditPage;
