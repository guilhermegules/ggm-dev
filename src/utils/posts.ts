import { getCollection } from "astro:content";
import type { BlogPostData } from "@components/desktop/types";

export function formatPostDate(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export async function getBlogPosts(): Promise<BlogPostData[]> {
  try {
    const rawPosts = await getCollection("blog");
    return rawPosts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        id: post.id,
        title: post.data.title,
        description: post.data.description,
        pubDate: formatPostDate(post.data.pubDate),
        heroImage: post.data.heroImage,
        html: post.rendered?.html,
      }));
  } catch {
    return [];
  }
}
