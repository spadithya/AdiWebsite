import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/projects',
    // Files now live in subfolders (lab/, hub/, side-quests/) for organization.
    // Strip the directory from the ID so URLs stay clean: lab/aerosol-mitigation.mdx
    // produces ID "aerosol-mitigation" (not "lab/aerosol-mitigation"), matching the
    // pre-refactor URLs. The category in frontmatter is still authoritative for
    // listing/routing; folders are organizational only.
    generateId: ({ entry }) => {
      const filename = entry.split('/').pop() ?? entry;
      return filename.replace(/\.mdx?$/, '');
    },
  }),
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
