export interface BlogPost {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly category: string;
  readonly published_at: string;
  readonly reading_minutes: number;
  readonly body: string;
}

export const LOCAL_POSTS: readonly BlogPost[] = [
  {
    slug: 'learning-in-public',
    title: 'Learning in public, one question at a time',
    excerpt: 'A space for notes from my ongoing study of software, research, and the craft of building useful things.',
    category: 'Learning notes',
    published_at: '2026-11-05',
    reading_minutes: 2,
    body: `## Why keep a study journal?\n\nThe most useful ideas from study are rarely the polished conclusions. They are the questions, experiments, and small corrections that make the next attempt better. This blog is where I will collect those notes as I work across software engineering, interaction design, and applied research.\n\n## What you can expect\n\nI plan to write about ideas I am actively learning, the decisions behind projects, and lessons from trying concepts in practice. Each post will include sources or further reading where relevant, along with the context needed to understand what worked and what did not.\n\n> These are working notes, shared so the learning can be useful beyond my own notebook.\n\nThis first post is a starting point. More notes will follow as the study does.`,
  },
];
