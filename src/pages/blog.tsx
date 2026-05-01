import { useState } from "react";
import { BlogCard } from "../components/BlogCard";
import { BLOGS } from "../constants/blogData"; // We'll create this next

export const Blog = () => {
  const [blogs] = useState(BLOGS);

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-24 mt-10">
        <h2 className="font-heading text-6xl md:text-8xl font-black mb-6 text-white tracking-tighter">INSIGHTS</h2>
        <p className="text-zinc-500 text-xl tracking-widest uppercase font-bold">
          Sharing thoughts on DevOps, Engineering & AI
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
