import { allPosts } from "contentlayer/generated";
import PostsLists from "@/components/PostsLists";
import PostsPagination from "@/components/PostPagination";
import { getPagination } from "@/utils/pagination";

export const metadata = {
  title: "Lista de todos los post",
  description: "Description posts - Generated by create next app",
};

const Posts = () => {
  const { currentItems, totalPages } = getPagination(allPosts);

  return (
    <div className="grid gap-4">
      <PostsLists posts={currentItems} />
      {totalPages > 1 && <PostsPagination totalPages={totalPages} />}
    </div>
  );
};
export default Posts;
