'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function MyPostPage() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    const fetchData = async () => {
      try {
        const [postRes, commentRes, userRes] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/posts?userId=${parsedUser.id}`),
          fetch('https://jsonplaceholder.typicode.com/comments'),
          fetch('https://jsonplaceholder.typicode.com/users'),
        ]);

        const userPosts = await postRes.json();
        const allComments = await commentRes.json();
        const users = await userRes.json();

        const userPostIds = userPosts.map((post: Post) => post.id);
        const userComments = allComments.filter((comment: Comment) =>
          userPostIds.includes(comment.postId)
        );

        setPosts(userPosts);
        setComments(userComments);
        setAllUsers(users);
      } catch (err) {
        console.error('Error fetching data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const getUsernameByUserId = (userId: number) => {
    const foundUser = allUsers.find(user => user.id === userId);
    return foundUser ? foundUser.username : 'Unknown User';
  };

  const getUsernameByEmail = (email: string) => {
    const foundUser = allUsers.find(user => user.email === email);
    return foundUser ? foundUser.username : 'Unknown User';
  };

  if (!user) {
    return <div className="p-6">Please login to view your posts and comments.</div>;
  }

  if (loading) {
    return <div className="p-6">Loading your posts and comments...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* User Profile Section */}
      <div className="flex items-center space-x-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-lg text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Posts Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Posts</h2>
        {posts.length === 0 ? (
          <div className="text-lg text-gray-500">You haven't created any posts yet.</div>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                <div>
                  <h3 className="font-semibold text-xl text-gray-800">{post.title}</h3>
                  <p className="text-sm text-gray-500">Posted by: {getUsernameByUserId(post.userId)}</p>
                </div>
                <p className="text-gray-700">{post.body}</p>

                {/* Comments Section */}
                <div className="mt-4">
                  <h4 className="font-medium text-lg text-gray-700">Comments</h4>
                  {comments.filter(comment => comment.postId === post.id).length === 0 ? (
                    <p className="text-sm text-gray-500">No comments for this post.</p>
                  ) : (
                    <div className="space-y-4">
                      {comments
                        .filter(comment => comment.postId === post.id)
                        .map(comment => (
                          <div key={comment.id} className="bg-gray-50 p-4 rounded-lg space-y-2">
                            <div>
                              <h5 className="font-medium text-gray-800">{comment.name}</h5>
                              <p className="text-xs text-gray-500">Commented by: {comment.email}</p>
                            </div>
                            <p className="text-gray-600">{comment.body}</p>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Go Back to Top Section */}
      <div className="mt-6 text-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go Back to Top
        </button>
      </div>
    </div>
  );
}
