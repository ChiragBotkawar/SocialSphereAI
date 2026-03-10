import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import Container from '../components/ui/Container';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';
import { useBlogPost } from '../hooks/useBlogs';
import { formatDate, getInitials } from '../utils/helpers';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = useBlogPost(slug ?? '');

  if (isLoading) return <div className="flex min-h-screen items-center justify-center"><Spinner size="lg" /></div>;
  if (isError || !post) return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <p className="text-gray-500">Article not found.</p>
      <Link to="/blog" className="btn-primary">Back to Blog</Link>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{post.title} | BNI Blog</title>
        <meta name="description" content={post.excerpt} />
        {post.coverImage && <meta property="og:image" content={post.coverImage} />}
      </Helmet>

      {/* Hero */}
      <section className="bg-dark py-16">
        <Container>
          <Link to="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <Badge variant="red">{post.category}</Badge>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="h-3 w-3" /> {post.readTime} min read
              </span>
            </div>
            <h1 className="mb-4 text-3xl font-black text-white lg:text-4xl">{post.title}</h1>
            <p className="text-gray-300">{post.excerpt}</p>
            <div className="mt-6 flex items-center gap-3">
              {post.author && (
                <>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {getInitials(typeof post.author === 'string' ? post.author : `${post.author.firstName} ${post.author.lastName}`)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {typeof post.author === 'string' ? post.author : `${post.author.firstName} ${post.author.lastName}`}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {formatDate(post.publishedAt ?? post.createdAt)}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Cover image */}
      {post.coverImage && (
        <div className="h-72 w-full overflow-hidden md:h-96">
          <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
        </div>
      )}

      {/* Content */}
      <section className="section-padding bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div
              className="prose prose-lg max-w-none prose-headings:text-dark prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
            />

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t pt-8">
                <Tag className="h-4 w-4 text-gray-400" />
                {post.tags.map((tag) => (
                  <Link key={tag} to={`/blog?tag=${tag}`} className="badge badge-gray hover:badge-red transition-colors">
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
