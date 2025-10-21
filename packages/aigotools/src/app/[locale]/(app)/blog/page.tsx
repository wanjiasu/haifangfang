import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/common/container";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { AppConfig } from "@/lib/config";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  author: {
    name: string;
    image?: {
      asset: {
        _ref: string;
      };
    };
  };
  categories: Array<{
    title: string;
    slug: { current: string };
  }>;
  body: any[];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("blog");

  return {
    title: `AI Blog | Latest AI News & Insights | ${AppConfig.siteName}`,
    description:
      "Stay ahead with our latest articles, tutorials, and AI industry news.",
    keywords:
      "AI blog, artificial intelligence news, AI tutorials, AI insights",
  };
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      asset,
      alt
    },
    author-> {
      name,
      image {
        asset
      }
    },
    categories[]-> {
      title,
      slug
    },
    body
  }`;

  return client.fetch(query);
}

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const posts = await getBlogPosts();

  return (
    <Container className="mt-4">
      {/* Summer-themed Hero Section */}
      <div className="relative overflow-hidden text-center py-20 mb-12 summer-card">
        {/* Summer background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-5 left-10 text-4xl animate-pulse">☀️</div>
          <div className="absolute top-10 right-20 text-3xl animate-bounce">🌴</div>
          <div className="absolute bottom-5 left-20 text-2xl animate-pulse">📝</div>
          <div className="absolute bottom-10 right-10 text-3xl animate-bounce">💡</div>
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-orange-500 via-yellow-400 to-red-500 bg-clip-text text-transparent mb-6">
          Summer Blog ☀️
        </h1>
        <p className="text-xl text-orange-700 dark:text-orange-300 max-w-3xl mx-auto leading-relaxed">
          Stay cool with our hottest articles, tutorials, and AI industry insights! 🌞<br/>
          Discover the latest trends while enjoying the summer vibes.
        </p>
      </div>

      {/* Summer-themed Featured Post */}
      {posts.length > 0 && (
        <div className="my-16">
          <div className="summer-card p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    🌟 Featured Summer Read
                  </span>
                  {posts[0].categories?.[0] && (
                    <span className="bg-orange-200 dark:bg-orange-700 text-orange-700 dark:text-orange-200 px-3 py-1 rounded-full text-sm font-medium">
                      {posts[0].categories[0].title}
                    </span>
                  )}
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-orange-800 dark:text-orange-200 mb-4 leading-tight">
                  {posts[0].title}
                </h2>
                <p className="text-orange-700 dark:text-orange-300 mb-6 text-lg leading-relaxed">
                  {posts[0].body?.[0]?.children?.[0]?.text?.substring(0, 200) ||
                    "Dive into this amazing summer article..."}
                  ...
                </p>
                <div className="flex items-center gap-4 mb-6">
                  {posts[0].author?.image && (
                    <img
                      alt={posts[0].author?.name ?? AppConfig.siteName}
                      className="w-12 h-12 rounded-full border-2 border-orange-300"
                      src={urlFor(posts[0].author.image)
                        .width(48)
                        .height(48)
                        .url()}
                    />
                  )}
                  <div>
                    <p className="font-semibold text-orange-800 dark:text-orange-200">
                      {posts[0].author?.name ?? AppConfig.siteName}
                    </p>
                    <p className="text-orange-600 dark:text-orange-400 text-sm">
                      {new Date(posts[0].publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Link
                  className="summer-btn inline-flex items-center gap-2 font-semibold hover:scale-105"
                  href={`/blog/${posts[0].slug.current}`}
                >
                  Read Full Article
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </Link>
              </div>
              <div className="relative">
                {posts[0].mainImage ? (
                  <img
                    alt={posts[0].mainImage.alt || posts[0].title}
                    className="w-full h-80 object-cover rounded-xl shadow-lg border-4 border-orange-200 hover:border-orange-400 transition-all duration-300"
                    src={urlFor(posts[0].mainImage)
                      .width(600)
                      .height(400)
                      .url()}
                  />
                ) : (
                  <div className="w-full h-80 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-xl flex items-center justify-center border-4 border-orange-200">
                    <span className="text-orange-600 text-lg font-medium">🌞 Summer Article</span>
                  </div>
                )}
                {/* Summer decoration */}
                <div className="absolute -top-2 -right-2 text-3xl animate-bounce">🌻</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summer-themed Blog Posts Grid */}
      <div className="mb-16">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="text-3xl animate-bounce">📚</div>
          <h2 className="text-4xl font-bold text-orange-600">
            Recent Summer Articles
          </h2>
          <div className="text-3xl animate-bounce">☀️</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              <article className="summer-card overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                <div className="relative">
                  {post.mainImage ? (
                    <img
                      alt={post.mainImage.alt || post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      src={urlFor(post.mainImage).width(400).height(250).url()}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-yellow-200 to-orange-200 flex items-center justify-center">
                      <span className="text-orange-600 font-medium">🌞 Summer Post</span>
                    </div>
                  )}
                  {post.categories?.[0] && (
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {post.categories[0].title}
                    </span>
                  )}
                  {/* Summer decoration */}
                  <div className="absolute top-2 right-2 text-2xl animate-pulse">🌻</div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-orange-800 dark:text-orange-200 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-orange-700 dark:text-orange-300 mb-4 line-clamp-3 leading-relaxed">
                    {post.body?.[0]?.children?.[0]?.text?.substring(0, 120) ||
                      "Discover this sunny article..."}
                    ...
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {post.author?.image && (
                        <img
                          alt={post.author?.name ?? AppConfig.siteName}
                          className="w-6 h-6 rounded-full border border-orange-300"
                          src={urlFor(post.author.image)
                            .width(24)
                            .height(24)
                            .url()}
                        />
                      )}
                      <span className="text-orange-800 dark:text-orange-200 text-sm font-medium">
                        {post.author?.name ?? AppConfig.siteName}
                      </span>
                    </div>
                    <span className="text-orange-600 dark:text-orange-400 text-sm">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition-colors">
                    <span>Read More</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-primary-800 text-white rounded-2xl p-8 lg:p-12 text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-primary-200 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and get the latest AI insights delivered
          to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            className="flex-1 px-4 py-3 rounded-lg text-primary-800 border-0 focus:ring-2 focus:ring-primary-300"
            placeholder="Enter your email"
            type="email"
          />
          <button className="bg-primary-600 hover:bg-primary-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </Container>
  );
}