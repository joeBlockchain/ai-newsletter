import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import BlogPostCard from "@/components/blog-post-card";
import { Bird, FileText, Rss, RssIcon, Search } from "lucide-react";
import SubscribeForm from "@/components/subscribe-form";
import { Separator } from "@/components/ui/separator";
import { getBlogPosts, type BlogPost } from "@/lib/actions";

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
          <h1 className="text-4xl font-bold">AI News on the Cheep</h1>
          <p className="text-lg mb-3">
            Your source for AI News summarized by ChatGPT 4o Mini
          </p>

          <SubscribeForm />
        </section>
        <Separator className="w-full" />
        <section className="flex flex-col w-full items-center px-5 py-[5rem]">
          <div className="grid grid-cols-1 gap-4">
            {blogPosts.map((post) => (
              <>
                {/* @ts-ignore */}
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
