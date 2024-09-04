import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import BlogPostCard from "@/components/blog-post-card";
import { Bird } from "lucide-react";
import SubscribeForm from "@/components/subscribe-form";
import { Separator } from "@/components/ui/separator";

// Define the type for our blog post
type BlogPost = {
  id: string;
  fields: {
    GUID: string;
    content: string;
    creator: string;
    imgURL: string;
    link: string;
    pubDate: string;
    title: string;
    source: string;
  };
};

async function getBlogPosts(): Promise<BlogPost[]> {
  const Airtable = require("airtable");
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appSMEQ0b0QCb3Gi0"
  );

  return new Promise((resolve, reject) => {
    const posts: BlogPost[] = [];
    base("RSS")
      .select({
        pageSize: 12,
        view: "Grid view",
        sort: [{ field: "pubDate", direction: "desc" }],
      })
      .eachPage(
        function page(records: any, fetchNextPage: any) {
          records.forEach((record: any) => {
            posts.push({
              id: record.id,
              fields: record.fields,
            });
          });
          fetchNextPage();
        },
        function done(err: any) {
          if (err) {
            reject(err);
            return;
          }
          resolve(posts);
        }
      );
  });
}

export default async function Home() {
  const blogPosts = await getBlogPosts();

  return (
    <main className="max-w-7xl mx-auto min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
      <nav>
        <SiteHeader />
      </nav>
      <div>
        <section className="flex flex-col w-full items-center px-5 py-[5rem] gap-4">
          <Bird className="w-16 h-16" />
          <h1 className="text-4xl font-bold">AI News on the Cheap</h1>
          <p className="text-lg mb-3">
            Your source for AI News summarized by ChatGPT 4o Mini
          </p>
          <SubscribeForm />
        </section>
        <section className="flex flex-col w-full items-center px-5 py-[5rem]">
          <div className="grid grid-cols-1 gap-4">
            {blogPosts.map((post) => (
              <>
                <BlogPostCard key={post.id} post={post} />
                <Separator className="w-full" />
              </>
            ))}
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
