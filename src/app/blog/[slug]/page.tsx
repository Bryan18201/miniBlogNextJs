import ButtonBack from "@/components/ButtonBack";
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export const generateStaticParams = () => {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
};

export const generateMetadata = ({ params }: Props) => {
  const post = allPosts.find((p) => p._raw.flattenedPath === params.slug);

  return {
    title: post?.title,
    description: post?.description,
  };
};

const PostLayout = ({ params }: Props) => {
  const post = allPosts.find((p) => p._raw.flattenedPath === params.slug);

  let MDXContent;

  if (!post) {
    return notFound();
  } else {
    MDXContent = useMDXComponent(post.body.code);
  }

  return (
    <div>
      <h1 className="text-center my-4 text-3xl">{post.title}</h1>
      <div className="mb-8 text-center">
      <time className="text-gray-700">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      </div>
      <MDXContent />
      <div className="text-center">
        <ButtonBack>Back</ButtonBack>
      </div>
    </div>
  );
};

export default PostLayout;
