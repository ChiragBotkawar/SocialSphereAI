import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';
import Container from '../components/ui/Container';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';
import { useBlogs, useBlogCategories } from '../hooks/useBlogs';
import { formatDate, truncate } from '../utils/helpers';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('');
  const [search, setSearch] = useState('');

  const { data, isLoading } = useBlogs({ category: activeCategory || undefined, search: search || undefined, limit: 12 });
  const { data: categories } = useBlogCategories();

  return (
    <>
      <Helmet>
        <title>BNI Blog | Business Networking & Growth Insights</title>
        <meta name="description" content="Read BNI's latest articles on business networking, referral marketing, success stories, and professional growth tips." />
      </Helmet>

      <section className="bg-dark py-16">
        <Container>
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Blog</span>
          <h1 className="text-4xl font-black text-white lg:text-5xl">BNI Blog</h1>
          <p className="mt-4 text-gray-300">Insights, tips, and stories to help you grow your business through referrals.</p>
        </Container>
      </section>

      {/* Filters */}
      <section className="bg-white border-b py-4">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-2 flex-1">
              <button
                onClick={() => setActiveCategory('')}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${!activeCategory ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                All
              </button>
              {categories?.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setActiveCategory(cat._id)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${activeCategory === cat._id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat._id} ({cat.count})
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input max-w-xs"
            />
          </div>
        </Container>
      </section>

      <section className="section-padding bg-light-bg">
        <Container>
          {isLoading ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : !data?.data?.length ? (
            <div className="py-20 text-center"><p className="text-gray-500">No articles found.</p></div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {data.data.map((post) => (
                <Link key={post._id} to={`/blog/${post.slug}`} className="card group flex flex-col hover:shadow-card-hover transition-shadow">
                  {post.coverImage && (
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="red">{post.category}</Badge>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min read
                    </span>
                  </div>
                  <h3 className="mb-2 font-bold text-dark group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-gray-600">{truncate(post.excerpt, 120)}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.publishedAt ?? post.createdAt)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
