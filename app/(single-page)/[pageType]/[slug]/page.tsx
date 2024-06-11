import { Page, getPosts } from "@opensource-construction/components";
import { notFound } from "next/navigation";

type PageType = "events" | "projects" | "trainings" | "faqs";

type SinglePageType = {
  pageType: PageType;
  slug: string;
};

type PageProps = {
  page: {
    metadata: {
      title: string;
      description?: string;
      event?: object;
      project?: object;
      links?: {
        url: string;
        label: string;
      }[];
      directMdLink?: string;
    };
    slug: string;
    content: string;
  };
};

async function fetchMarkdownContent(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch content from ${url}: ${response.statusText}`,
    );
  }
  let content = await response.text();
  content = cleanMarkdownContent(content);
  return content;
}

function cleanMarkdownContent(content: string): string {
  // Use a regex to remove problematic HTML tags
  return content.replace(/<[^>]*>/g, "");
}

async function fetchPageData(pageType: PageType, slug: string) {
  let page = getPosts(pageType).find((page) => page.slug === slug);

  if (!page || pageType === "faqs") {
    return null;
  }

  if (page.metadata.directMdLink) {
    try {
      console.log(
        `Fetching markdown content from ${page.metadata.directMdLink}`,
      );
      const content = await fetchMarkdownContent(page.metadata.directMdLink);
      page.content = content;
    } catch (error) {
      console.error(
        `Failed to fetch markdown content from ${page.metadata.directMdLink}:`,
        error,
      );
      return null;
    }
  }

  return page;
}

export async function generateStaticParams() {
  let posts: SinglePageType[] = [];
  console.log(
    "Generating static paths for single pages (events, projects, trainings)",
  );
  posts = [
    ...posts,
    ...getPosts("projects").map((p) => {
      return {
        slug: p.slug,
        pageType: "projects" as PageType,
      };
    }),
    ...getPosts("events").map((p) => {
      return {
        slug: p.slug,
        pageType: "events" as PageType,
      };
    }),
    ...getPosts("trainings").map((p) => {
      return {
        slug: p.slug,
        pageType: "trainings" as PageType,
      };
    }),
  ];
  return posts;
}

export default async function SinglePage({
  params,
}: {
  params: SinglePageType;
}) {
  const { pageType, slug } = params;

  const page = await fetchPageData(pageType, slug);

  if (!page) {
    notFound();
  }

  return <Page page={page} />;
}
