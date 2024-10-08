import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAIArticleByRSSID, type AIArticle } from "@/lib/actions";
import ArticlePost from "@/components/article-post";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function ArticlePage({
  params,
}: {
  params: { rssid: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const aiArticle = await getAIArticleByRSSID(parseInt(params.rssid));

  if (!aiArticle) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
      <nav>
        <SiteHeader />
      </nav>
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            ← Back to Articles
          </Button>
        </Link>
        <div className="flex items-center justify-center">
          <ArticlePost article={aiArticle as AIArticle} />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
