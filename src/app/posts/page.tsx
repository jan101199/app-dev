'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;

    const { isAdmin, id: userId } = JSON.parse(storedUser);

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => {
        const filtered = isAdmin ? data : data.filter((post: Post) => post.userId === userId);
        setPosts(filtered);
        setLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-blue-700">Posts</h1>
          <span className="text-gray-700 font-medium">Admin</span>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-4 text-black py-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-5 bg-white rounded-xl shadow animate-pulse space-y-3">
                <div className="w-1/2 h-5 bg-gray-200 rounded"></div>
                <div className="w-full h-4 bg-gray-200 rounded"></div>
                <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-12">No posts found.</p>
        ) : (
          <ul className="space-y-6">
            {filteredPosts.map(post => (
              <li
                key={post.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6"
              >
                <Link href={`/posts/${post.id}`}>
                  <div className="space-y-2 cursor-pointer">
                    <h2 className="text-xl font-semibold text-blue-700 transition">
                      {post.title}
                    </h2>
                    <p className="text-gray-700 text-sm line-clamp-3">{post.body}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
