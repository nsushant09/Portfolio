import { useState, useEffect } from "react";
import { BlogCard } from "../components/BlogCard";
import { BLOGS } from "../constants/blogData"; // We'll create this next

export const Blog = () => {
  const [blogs, setBlogs] = useState(BLOGS);

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Blog</h2>
        <p className="text-zinc-400">
          Sharing insights and my  on DevOps, Software Engineering, AI, Cloud, and more.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} {...blog} />
        ))}
      </div>
    </section>
  );
};
