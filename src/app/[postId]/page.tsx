import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type BlogPost = {
  id: string;
  fields: Record<string, any>;
};

async function getBlogPost(postId: string): Promise<BlogPost | null> {
  const Airtable = require("airtable");
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appSMEQ0b0QCb3Gi0"
  );

  return new Promise((resolve, reject) => {
    base("News").find(postId, (err: any, record: any) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      if (record) {
        resolve({
          id: record.id,
          fields: record.fields,
        });
      } else {
        resolve(null);
      }
    });
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = await getBlogPost(params.postId);

  if (!post) {
    notFound();
  }

  const keywords = JSON.parse(post.fields.Keywords || "[]");

  return (
    <main className="max-w-7xl mx-auto min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
      <nav>
        <SiteHeader />
      </nav>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <h1 className="text-3xl font-bold mb-2">{post.fields.Title}</h1>
            <div className="flex justify-between items-center mb-8">
              <p className="text-sm text-muted-foreground">
                {post.fields.Source}
              </p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(post.fields.Date), "MMM dd yyyy")}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 my-4">
              {keywords.map((keyword: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.fields.Summary}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      </div>
      <SiteFooter />
    </main>
  );
}
