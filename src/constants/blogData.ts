
const BLOGS_FOLDER = "/blogs";
export interface Blog {
    title: string;
    excerpt: string;
    category: string;
    date: string;
    slug: string;
    file: string;
  }
  
  // Categories: DevOps/AI/SDE/Cloud
  export const BLOGS: Blog[] = [
    {
      title: "AI vs. Machine Learning vs. Deep Learning",
      excerpt: "An exploration of the hierarchy between Artificial Intelligence, Machine Learning, and Deep Learning, explaining how systems evolved from hard-coded rules to autonomous feature extraction using neural networks.",
      category: "AI",
      date: "Jan 13, 2026",
      slug: "ai-vs-ml-vs-dl",
      file: `${BLOGS_FOLDER}/ai-vs-ml-vs-dl.md`
    },
    {
      title: "Machine Learning Fundamentals",
      excerpt: "An introduction to the core concepts of Machine Learning, covering why it is used, different learning paradigms, and key algorithms that help systems learn from data and make intelligent decisions.",
      category: "AI",
      date: "Jan 12, 2026",
      slug: "machine-learning-fundamentals",
      file: `${BLOGS_FOLDER}/machine-learning-fundamentals.md`
    }
  ];
  