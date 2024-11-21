"use client";
import { FaThumbsUp, FaThumbsDown, FaEye } from "react-icons/fa";
import usePosts from "@/app/hooks/usePosts";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  views: number;
}

const SectionAtom = ({ id, title, body, likes, dislikes, views }: PostCardProps) => {
  return (
    <div className="border-[5px] border-blue-500  rounded-lg p-6 mb-6 ml-10 mr-10 shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
      <h2 className="text-2xl font-bold mb-3 ">{title}</h2>
      <p className=" mb-5">{body}</p>
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <FaThumbsUp className="mr-2 text-yellow-400" />{likes}
          <FaThumbsDown className="ml-4 mr-2 text-red-500" />{dislikes}
        </div>
        <div className="flex items-center">
          <FaEye className="mr-2 text-green-400" />{views}
        </div>
      </div>
      <Link href={`/post/${id}`}>
        <button className="p-2 bg-yellow-400 text-black mt-6 rounded-xl pl-8 pr-8 hover:bg-yellow-500 transition duration-300">
          See more..
        </button>
      </Link>
    </div>
  );
};

const PostsPage = () => {
  const data = usePosts();

  if (data.loading) {
    return <div className="text-center text-blue-600 font-bold text-xl mt-10">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {data.posts.map(post => (
        <SectionAtom
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          likes={post.reactions.likes}
          dislikes={post.reactions.dislikes}
          views={post.views}
        />
      ))}
    </div>
  );
};

export default PostsPage;
