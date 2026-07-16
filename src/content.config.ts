import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default(["General"]),
    author: z.string().default("Agustí Grau"),
    lang: z.string().default("ca"),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
