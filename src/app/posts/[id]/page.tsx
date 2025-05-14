'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

type Post = { id: number; title: string; body: string; userId: number };
type Comment = { id: number; name: string; email: string; body: string };

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const postId = Number(params?.id);

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(storedUser);

    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(res => res.json()),
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).then(res => res.json())
    ])
      .then(([postData, commentsData]) => {
        if (!user.isAdmin && postData.userId !== user.id) {
          router.push('/posts');
        } else {
          setPost(postData);
          setComments(commentsData);
        }
      })
      .finally(() => setLoading(false));
  }, [postId, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-lg text-gray-500 animate-pulse">Loading post and comments...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center text-red-600 text-xl py-12">
        ⚠️ Post not found or access denied.
      </div>
    );
  }

  return (
<div className="max-w-4xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-10">

        {/* Post Content */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-lg text-gray-700 leading-relaxed">{post.body}</p>
        </div>

        {/* Comments */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">Comments</h2>
          {comments.length === 0 ? (
            <p className="text-gray-500 text-base">No comments available.</p>
          ) : (
            <ul className="space-y-5">
              {comments.map(comment => (
                <li
                  key={comment.id}
                  className="p-5 rounded-xl bg-gray-100 shadow hover:shadow-md transition duration-200"
                >
                  <div className="mb-1 text-lg font-medium text-gray-800">{comment.name}</div>
                  <div className="text-sm text-gray-500 mb-2">{comment.email}</div>
                  <p className="text-gray-700">{comment.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

  );
}
