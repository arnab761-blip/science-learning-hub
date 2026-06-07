export interface Article {
  title: string;
  content: string;
  date: string;
  image?: string;
  category?: string;
  author?: string;
  readTime?: string;
}

export interface Question {
  id: string;
  title: string;
  category: "Physics" | "Astronomy" | "Biology" | "Chemistry" | "General";
  author: string;
  date: string;
  votes: number;
  answersCount: number;
  solved: boolean;
  replies: Reply[];
}

export interface Reply {
  id: string;
  author: string;
  role: "Educator" | "Student" | "Moderator" | "Scientist";
  content: string;
  date: string;
  upvotes: number;
}

export interface Ebook {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  pages: number;
  category: string;
  chapters: string[];
}

export interface LiveSession {
  id: string;
  title: string;
  speaker: string;
  role: string;
  date: string;
  time: string;
  platform: string;
  description: string;
  registered: boolean;
}
