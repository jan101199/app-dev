'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function DashboardPage() {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersRes, postsRes, commentsRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/posts'),
          fetch('https://jsonplaceholder.typicode.com/comments'),
        ]);

        if (!usersRes.ok || !postsRes.ok || !commentsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const users = await usersRes.json();
        const posts = await postsRes.json();
        const comments = await commentsRes.json();

        setUserCount(users.length);
        setPostCount(posts.length);
        setCommentCount(comments.length);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Properly typed chart options
  const chartOptions: ApexOptions = {
    chart: {
      id: 'stats-mixed',
      type: 'line', // required to match the ApexChart types
    },
    stroke: {
      width: [0, 2, 3],
      curve: 'smooth',
    },
    xaxis: {
      categories: ['Users', 'Posts', 'Comments'],
    },
    fill: {
      opacity: [0.85, 0.25, 0.85],
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  const chartSeries = [
    {
      name: 'User Count',
      type: 'bar',
      data: [userCount, 0, 0],
    },
    {
      name: 'Post Count',
      type: 'line',
      data: [0, postCount, 0],
    },
    {
      name: 'Comment Count',
      type: 'area',
      data: [0, 0, commentCount],
    },
  ];

  if (loading) {
    return <div className="text-center text-gray-500 text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-lg">Error: {error}</div>;
  }

  return (
    <div className="p-8 w-full max-w-4xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl shadow-xl">
      <h1 className="text-4xl font-semibold text-gray-800 mb-4 text-center">User Data Chart</h1>

      <div className="w-full mx-auto">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line" 
          height={350}
        />
      </div>
    </div>
  );
}
