"use client";

import { useState, useEffect } from "react";
import { BookOpen, Calendar, ArrowRight, TrendingUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

// Mock blog data - replace with your actual blog data
const featuredBlogs = [
  {
    id: 1,
    title: "Building Modern Web Applications with Next.js 14",
    excerpt: "Learn how to leverage the latest features in Next.js 14 for building performant web applications with server components and improved routing.",
    category: "Web Development",
    readTime: "8 min read",
    publishDate: "2024-12-15",
    views: 1250,
    trending: true,
    image: "/assets/images/nextjs.png",
    slug: "building-modern-web-apps-nextjs-14"
  },
  {
    id: 2,
    title: "The Complete Guide to React Hooks in 2024",
    excerpt: "Master React hooks with practical examples and best practices. From useState to custom hooks, everything you need to know.",
    category: "React",
    readTime: "12 min read",
    publishDate: "2024-12-10",
    views: 2100,
    trending: true,
    image: "/assets/images/React.png",
    slug: "complete-guide-react-hooks-2024"
  },
  {
    id: 3,
    title: "Database Design Patterns with MongoDB",
    excerpt: "Explore advanced MongoDB patterns and best practices for scaling your database architecture effectively.",
    category: "Database",
    readTime: "15 min read",
    publishDate: "2024-12-05",
    views: 890,
    trending: false,
    image: "/assets/images/mongo.png",
    slug: "database-design-patterns-mongodb"
  }
];

const blogCategories = [
  "All", "Web Development", "React", "Next.js", "Database", "UI/UX", "Backend"
];

export default function BlogsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleBlogs, setVisibleBlogs] = useState<number[]>([]);

  const filteredBlogs = selectedCategory === "All" 
    ? featuredBlogs 
    : featuredBlogs.filter(blog => blog.category === selectedCategory);

  // Stagger animation for blogs
  useEffect(() => {
    setVisibleBlogs([]);
    const timer = setTimeout(() => {
      filteredBlogs.forEach((_, index) => {
        setTimeout(() => {
          setVisibleBlogs(prev => [...prev, index]);
        }, index * 200);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedCategory, filteredBlogs]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-base to-surface-alt relative overflow-hidden" id="blogs">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-accent" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Latest <span className="text-accent">Articles</span>
              </h2>
            </div>
            <p className="text-light-span text-lg max-w-2xl mx-auto">
              Insights, tutorials, and thoughts on web development and technology
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-accent text-white shadow-lg"
                    : "bg-surface-elevated text-light-span hover:text-white hover:bg-accent/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredBlogs.map((blog, index) => (
              <article
                key={blog.id}
                className={`group bg-surface-elevated rounded-2xl overflow-hidden border border-surface-light hover:border-accent/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                  visibleBlogs.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Blog Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/images/bg.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Trending Badge */}
                  {blog.trending && (
                    <div className="absolute top-4 left-4 flex items-center gap-1 bg-accent px-2 py-1 rounded-full text-xs text-white font-medium">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </div>
                  )}

                  {/* Category */}
                  <div className="absolute top-4 right-4 bg-black/70 px-2 py-1 rounded-full text-xs text-white">
                    {blog.category}
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-300">
                    {blog.title}
                  </h3>
                  
                  <p className="text-light-span text-sm mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Blog Meta */}
                  <div className="flex items-center justify-between text-xs text-light-span mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(blog.publishDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {blog.views.toLocaleString()}
                      </div>
                    </div>
                    <span className="font-medium">{blog.readTime}</span>
                  </div>

                  {/* Read More Button */}
                  <Button
                    variant="ghost"
                    className="w-full text-accent hover:text-white hover:bg-accent p-0 h-auto py-2 rounded-lg font-medium group/btn"
                    onClick={() => {
                      // Navigate to blog post
                      window.location.href = `/articles/${blog.id}/${blog.slug}`;
                    }}
                  >
                    <span className="flex items-center gap-2">
                      Read Article
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </span>
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* View All Blogs Button */}
          <div className="text-center">
            <Button
              className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={() => {
                window.location.href = '/articles';
              }}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              View All Articles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
