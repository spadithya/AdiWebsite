import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/projects',
  }),
  // Files live in subfolders (lab/, hub/, side-quests/) for source organization.
  // Astro assigns IDs that include the directory: e.g. "lab/photodiode-biomarker-sensor".
  // URL slugs are derived from id.split('/').pop() in page files so that subfolder
  // paths don't leak into URLs. The `category` field in frontmatter is still the
  // source of truth for routing/listing; folders are organizational only.
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    yearEnd: z.number().optional(),
    status: z.enum(['active', 'completed', 'archived']).default('completed'),
    category: z.enum(['lab', 'side-quests', 'hub', 'off-hours']),
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
