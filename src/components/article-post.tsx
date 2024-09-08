import { format, parseISO } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Article = {
  original_title: string;
  generated_at: string;
  ai_content: string;
  img_url?: string;
};

type ArticlePostProps = {
  article: Article;
};

export default function ArticlePost({ article }: ArticlePostProps) {
  const { original_title, generated_at, ai_content, img_url } = article;

  // Strip the <article> tags from ai_content
  let strippedContent = ai_content
    ? ai_content.replace(/<\/?article>/g, "").trim()
    : "";

  // Remove the title from the content if it's present
  const titleRegex = new RegExp(`^#\\s*${original_title}\\s*\n`, "i");
  strippedContent = strippedContent.replace(titleRegex, "");

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
        {format(parseISO(generated_at), "MMMM d, yyyy")}
      </p>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
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
