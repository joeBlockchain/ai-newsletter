import { format, parseISO } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import { type AIArticle } from "@/lib/actions";

type ArticlePostProps = {
  article: AIArticle & { img_url?: string };
};

export default function ArticlePost({ article }: ArticlePostProps) {
  const {
    original_title = "",
    generated_at = "",
    ai_content = "",
    img_url,
  } = article;

  // Strip the <article> tags from ai_content
  let strippedContent = ai_content
    ? ai_content.replace(/<\/?article>/g, "").trim()
    : "";

  return (
    <div className="space-y-4">
      {img_url && (
        <div className="flex justify-center">
          <div
            className="w-[600px] h-[400px] bg-cover bg-center rounded-md"
            style={{ backgroundImage: `url(${img_url})` }}
          />
        </div>
      )}
      {/* <h1 className="text-5xl font-bold">{original_title}</h1> */}
      <p className="text-sm text-muted-foreground">
        {generated_at && format(parseISO(generated_at), "MMMM d, yyyy")}
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
