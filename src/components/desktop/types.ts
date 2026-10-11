export interface BlogPostData {
  id: string;
  title: string;
  description: string;
  pubDate: string;
  heroImage?: string;
  body?: string;
}

export type WindowType =
  | "about"
  | "terminal"
  | "blog"
  | "settings"
  | "links"
  | "post";

export interface WindowItem {
  id: string;
  title: string;
  icon: string;
  subtitle?: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: WindowType;
  postData?: BlogPostData;
}
