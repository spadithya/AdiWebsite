import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    yearEnd: z.number().optional(),
    status: z.enum(['active', 'completed', 'archived']).default('completed'),
    category: z.enum(['research', 'industry', 'hardware', 'software']),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().optional(),
    heroImage: z.string().optional(),
    videoId: z.string().optional(),
    role: z.string().optional(),
    collaborators: z.array(z.string()).optional(),
    funding: z.array(z.string()).optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
        })
      )
      .optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
