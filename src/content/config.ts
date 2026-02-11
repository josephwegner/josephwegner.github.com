import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    redirect_from: z.string().optional(),
    postLayout: z.string().optional(),
    tutorialbg: z.string().optional(),
    message: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    link: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.enum(['code', 'hobby']).optional().default('code'),
  }),
});

export const collections = { blog, projects };
