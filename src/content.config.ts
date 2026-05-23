import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const games = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/games' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string().optional(),
    genre: z.string().optional(),
    platform: z.string().optional(),
    order: z.number().default(999),
  }),
});

const stages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stages' }),
  schema: z.object({
    game: z.string(),
    stage: z.number(),
    path: z.array(z.string()).default([]),
    title: z.string(),
    image: z.string().optional(),
    hints: z.array(
      z.object({
        text: z.string(),
        image: z.string().optional(),
      })
    ),
  }),
});

export const collections = { games, stages };
