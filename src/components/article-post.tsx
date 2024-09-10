import { format, parseISO } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import { type AIArticle } from "@/lib/actions";
import { Separator } from "@radix-ui/react-separator";

type ArticlePostProps = {
  article: AIArticle & { img_url?: string; title?: string; pub_date?: string };
};

export default function ArticlePost({ article }: ArticlePostProps) {
  const { title = "", pub_date = "", content = "", img_url } = article;

  console.log(article);

  // Strip the <article> tags from ai_content
  let strippedContent = content
    ? content.replace(/<\/?article>/g, "").trim()
    : "";

  return (
    <div className="space-y-4">
      {/* <h1 className=" text-4xl font-bold max-w-3xl text-center">{title}</h1> */}
      {img_url && (
        <div className="flex justify-center items-center py-5">
          <div
            className="w-[600px] h-[400px] bg-cover bg-center rounded-md justify-center items-center"
            style={{ backgroundImage: `url(${img_url})` }}
          />
        </div>
      )}
      <p className="text-sm text-muted-foreground">
        {pub_date && format(parseISO(pub_date), "MMMM d, yyyy")}
      </p>
      <div className="prose prose-lg dark:prose-invert">
        <ReactMarkdown
          // remarkPlugins={[remarkGfm]}
          // rehypePlugins={[
          //   [
          //     remarkRehype,
          //     {
          //       footnoteBackContent: "↖",
          //       footnoteBackLabel: "↖",
          //     },
          //   ],
          // ]}
          components={{
            a: ({ node, ...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer" />
            ),
          }}
        >
          {strippedContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
