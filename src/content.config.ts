
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// ♡ WEEKLY SERIES COLLECTION
// Each series contains 7 videos with an optional theme.

const series = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/series",
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),
    week: z.number().int().positive(),
    startDate: z.coerce.date(),
    theme: z.string().optional(),
  }),
});

// ♡ VIDEO COLLECTION
// Each video belongs to a weekly series and one of 7 categories.

const videos = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/videos",
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),

    // Which weekly series this video belongs to
    series: z.string(),

    // Episode position (1 through 7)
    day: z.number().int().min(1).max(7),

    // Recurring content category
    category: z.enum([
      "research",
      "project",
      "tech-girlie",
      "data-science",
      "ai",
      "ethics",
      "news",
    ]),

    // Publication date
    publishDate: z.coerce.date(),

    // Optional external video and code links
    tiktokUrl: z.url().optional(),
    githubUrl: z.url().optional(),

    // Additional resources mentioned in the video
    links: z.array(
      z.object({
        label: z.string(),
        url: z.url(),
      })
    ).default([]),
  }),
});

// ♡ REGISTER CONTENT COLLECTIONS

export const collections = {
  series,
  videos,
};
