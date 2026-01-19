import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";
import { BLOGS } from "../constants/blogData";

export const BlogPost = () => {
  const { slug } = useParams();
  const [content, setContent] = useState<string>("");

  // Find the blog metadata to access the date and file path
  const blogMetadata = BLOGS.find((b) => b.slug === slug);

  useEffect(() => {
    if (slug && blogMetadata) {
      fetch(blogMetadata.file)
        .then((res) => res.text())
        .then((text) => setContent(text))
        .catch((err) => console.error("Error fetching markdown:", err));
    }
  }, [slug, blogMetadata]);

  return (
    <section className="py-8 px-6 max-w-4xl mx-auto">
      {/* 1. Date Header */}
      {blogMetadata && (
        <div className="flex justify-end mb-4">
          <span className="text-zinc-500 text-sm font-medium tracking-wide uppercase">
            {blogMetadata.date}
          </span>
        </div>
      )}

      {content ? (
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              // Headers
              h1: ({ ...props }) => <h1 className="text-5xl text-center font-bold mt-8 mb-16" {...props} />,
              h2: ({ ...props }) => <h2 className="text-3xl font-bold mt-12 mb-6 border-b border-zinc-800 pb-2" {...props} />,
              h3: ({ ...props }) => <h3 className="text-2xl font-semibold mt-8 mb-4 border-b border-zinc-800 pb-2" {...props} />,

              // Text and Lists
              p: ({ ...props }) => <p className="leading-8 mb-6 text-zinc-300 text-justify" {...props} />,
              ul: ({ ...props }) => <ul className="list-disc ml-6 mb-6 space-y-2 text-zinc-300 text-lg" {...props} />,
              ol: ({ ...props }) => <ol className="list-decimal ml-6 mb-6 space-y-2 text-zinc-300 text-lg" {...props} />,
              li: ({ ...props }) => <li className="text-lg" {...props} />,

              // Image Centering and Captioning Logic
              img: ({ ...props }) => (
                <span className="flex flex-col items-center my-8">
                  <img
                    {...props}
                    className="rounded-xl border border-zinc-900 max-w-full md:max-w-[85%] h-auto"
                    alt={props.alt || "Blog Image"}
                  />
                  {props.alt && (
                    <span className="text-zinc-500 text-sm mt-2 italic text-center block w-full">
                      {props.alt}
                    </span>
                  )}
                </span>
              ),

              // Blockquote
              blockquote: ({ ...props }) => (
                <blockquote className="border-l-4 border-zinc-500 pl-4 italic my-6 text-zinc-400" {...props} />
              ),

              // Horizontal Rule
              hr: () => <hr className="my-8 border-zinc-800" />,

              // Code Blocks
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              code: ({ className, children, ...props }: any) => {
                return (
                  <code className={`${className} rounded-lg px-2 py-2`} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      ) : (
        <p className="text-zinc-400 text-center">Loading content...</p>
      )}
    </section>
  );
};