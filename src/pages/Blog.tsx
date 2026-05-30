import { Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import Layout from '../components/Layout';
import { initialBlogPosts } from '../data/products';

export default function Blog() {
  const posts = initialBlogPosts;

  const categories = ['الكل', 'مراجعات', 'شروحات', 'أخبار', 'عروض'];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">المدونة</h1>
          <p className="text-slate-400">آخر الأخبار والمقالات التقنية</p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  i === 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article key={post.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden hover:border-blue-500/50 transition-colors">
                <Link to={`/blog/${post.id}`} className="block">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-blue-500/20 text-blue-400 text-xs font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                      <Clock className="w-4 h-4" />
                      5 دقائق قراءة
                    </div>
                  </div>
                  <Link to={`/blog/${post.id}`}>
                    <h2 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-400 text-sm">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 text-white font-medium px-6 py-3 rounded-xl transition-colors">
              تحميل المزيد
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}