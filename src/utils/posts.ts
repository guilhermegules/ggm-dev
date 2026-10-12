import { getCollection } from "astro:content";
import type { BlogPostData } from "@components/desktop/types";

export async function getBlogPosts(): Promise<BlogPostData[]> {
  try {
    const rawPosts = await getCollection("blog");
    return rawPosts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        id: post.id,
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        heroImage: post.data.heroImage,
        body: post.body,
        html: post.rendered?.html,
      }));
  } catch {
    return [];
  }
}
