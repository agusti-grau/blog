import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESC, SITE_URL } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESC,
    site: context.site || SITE_URL,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id.replace(/\.mdx?$/, "")}/`,
    })),
    customData: `<language>ca</language>`,
  });
}
