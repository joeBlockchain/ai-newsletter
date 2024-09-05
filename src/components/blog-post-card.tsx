import { format } from "date-fns";
import { Alert } from "@/components/ui/alert";
import Link from "next/dist/client/link";
import { Badge } from "./ui/badge";
import { Button } from "@/components/ui/button";

type BlogPostProps = {
  post: {
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
      id: string;
    };
  };
};

export default async function BlogPostCard({ post }: BlogPostProps) {
  const { fields } = post;

  return (
    <Alert className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[100px_1fr_300px] gap-4 border-none">
      <div className="hidden lg:block text-sm text-muted-foreground">
        {format(new Date(fields.pubDate), "MMM d, yyyy")}
      </div>
      <div className=" max-w-lg">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="mb-2 py-2">
            {fields.source}
          </Badge>
          <div className="text-sm text-muted-foreground sm:hidden">
            {format(new Date(fields.pubDate), "MMM d, yyyy")}
          </div>
        </div>
        <img
          src={fields.imgURL}
          alt={fields.title}
          className="w-full h-auto mb-1 rounded-md sm:hidden"
        />
        <Link href={fields.link} className="hover:underline">
          <h2 className="text-2xl font-bold mb-2">{fields.title}</h2>
        </Link>
        <p className="text-base mb-2">{fields.content}</p>
        {fields.creator && (
          <p className="text-sm text-muted-foreground">By {fields.creator}</p>
        )}
        <div className="flex justify-end">
          <Link href={`/article/${fields.id}`}>
            <Button variant="outline" className="mt-2">
              Read AI Summary
            </Button>
          </Link>
        </div>
      </div>
      <div className="hidden sm:block">
        <div className="flex lg:hidden justify-end text-sm text-muted-foreground mb-4 mt-3">
          {format(new Date(fields.pubDate), "MMM d, yyyy")}
        </div>
        <img
          src={fields.imgURL}
          alt={fields.title}
          className="w-full h-auto mb-1 rounded-md"
        />
      </div>
    </Alert>
  );
}
