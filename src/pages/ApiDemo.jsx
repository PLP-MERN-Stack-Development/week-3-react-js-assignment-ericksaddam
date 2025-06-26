import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Layout from '../components/Layout';

export default function ApiDemo() {
  return (
    <Layout>
      <ApiDemoContent />
    </Layout>
  );
}

function ApiDemoContent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!res.ok) throw new Error('Failed to fetch');
        let posts = await res.json();
        if (search) {
          posts = posts.filter(post =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.body.toLowerCase().includes(search.toLowerCase())
          );
        }
        setTotalPages(Math.ceil(posts.length / ITEMS_PER_PAGE));
        setData(posts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page, search]);

  return (
    <div className="max-w-3xl mx-auto py-8 w-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">API Demo (Posts)</h2>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="border border-blue-400 rounded px-3 py-2 w-full bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      {loading && <div className="text-blue-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map(post => (
          <Card key={post.id}>
            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
            <p>{post.body}</p>
          </Card>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-6">
        <Button
          variant="secondary"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1 || loading}
        >
          Previous
        </Button>
        <span className="px-3 py-2">Page {page} of {totalPages}</span>
        <Button
          variant="secondary"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || loading}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
