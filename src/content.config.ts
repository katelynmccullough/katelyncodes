
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// ♡ PERMANENT SERIES COLLECTION
// Seven ongoing series, each with a dedicated day.

const series = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/series",
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),

    // The day this series publishes new episodes
    day: z.enum([
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ]),

    // Used to order the series on the website
    order: z.number().int().min(1).max(7),

    // Optional short tagline
    tagline: z.string().optional(),

    // Optional cover image
    coverImage: z.string().optional(),
  }),
});

// ♡ VIDEO COLLECTION
// Each video belongs to one permanent series.

const videos = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/videos",
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),

    // Must match a series Markdown filename
    series: z.string(),

    // Episode number within that series
    episode: z.number().int().positive(),

    // Publication date
    publishDate: z.coerce.date(),

    // Drafts won't appear once we add filtering
    draft: z.boolean().default(false),

    // Optional TikTok and GitHub links
    tiktokUrl: z.url().optional(),
    githubUrl: z.url().optional(),

    // Optional episode thumbnail
    thumbnail: z.string().optional(),

    // Links to tutorials, articles, papers, and tools
    links: z.array(
      z.object({
        label: z.string(),
        url: z.url(),
      })
    ).default([]),
  }),
});


// ♡ RESOURCE LIBRARY COLLECTION

const resources = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/resources",
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.url(),

    categories: z.array(
      z.enum([
        "learn-to-code",
        "favorite-creators",
        "tech-stack",
        "research",
        "worth-reading",
        "github-guides",
      ])
    ).min(1),

    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    type: z.enum([
        "tutorial",
        "creator",
        "tool",
        "research",
        "article",
        "github-guide",
        ]).optional(),

    image: z.string().optional(),
    author: z.string().optional(),
    difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
    platform: z.string().optional(),

    kind: z.enum([
        "learning-platform",
        "community",
        "hackathon",
        "tutorial",
        "other",
    ]).default("other"),
  }),
});

// ♡ PROJECT PORTFOLIO COLLECTION

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/projects",
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),

    githubUrl: z.url(),
    demoUrl: z.url().optional(),
    image: z.string().optional(),

    techStack: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    publishDate: z.coerce.date().optional(),
    status: z.enum([
        "Completed",
        "In Progress",
        "Archived",
        ]).optional(),

    role: z.string().optional(),
  }),
});


// ♡ REGISTER COLLECTIONS

export const collections = {
  series,
  videos,
  resources,
  projects,
};
