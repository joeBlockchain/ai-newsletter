import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import BlogPostCard from "@/components/blog-post-card";
import { Separator } from "@/components/ui/separator";
import { getBlogPosts } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const blogPosts = await getBlogPosts();

  return (
    <main className="max-w-7xl mx-auto min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
      <nav>
        <SiteHeader />
      </nav>
      <div>
        {!user ? (
          <section className="flex flex-col w-full items-center px-5 py-[5rem] gap-4">
            <div className="flex flex-col justify-center space-y-4">
              <div className="mx-3 space-y-2 lg:space-y-3 max-w-md md:max-w-2xl lg:max-w-3xl">
                <h1 className="leading-tight lg::leading-snug font-black text-5xl lg:text-7xl ">
                  AI News on the Cheep
                </h1>
                <p className="leading-normal text-xl text-muted-foreground">
                  Don&apos;t miss out on the latest AI news. Get the latest news
                  summarized by ChatGPT 4o Mini.
                </p>
              </div>
              <div className="flex flex-row items-center space-x-4 pt-4">
                <Button
                  asChild
                  variant="default"
                  className="mx-3 w-40 text-lg h-12 lg:h-14 lg:rounded-lg lg:text-xl"
                >
                  <Link href="/signin/password_signin">Get Started</Link>
                </Button>
                {/* <Button
              asChild
              variant="outline"
              className="mx-3 w-40 text-lg h-12 lg:h-14 lg:rounded-xl lg:text-xl"
            >
              <Link href="/login">Learn More</Link>
            </Button> */}
              </div>
            </div>
          </section>
        ) : (
          <section className="flex flex-col w-full items-center px-5 py-[5rem]">
            <div className="grid grid-cols-1 gap-4">
              {blogPosts?.map((post) => (
                <>
                  {/* @ts-ignore */}
                  <BlogPostCard key={post.id} post={post} />
                  <Separator className="w-full" />
                </>
              ))}
            </div>
          </section>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
