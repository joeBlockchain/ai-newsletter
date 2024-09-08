import { format } from "date-fns";
import { Alert } from "@/components/ui/alert";
import Link from "next/dist/client/link";
import { Badge } from "./ui/badge";
import { Button } from "@/components/ui/button";

export default async function BlogPostCard({ post }: { post: any }) {
  return (
    <Alert className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[100px_1fr_300px] gap-4 border-none">
      <div className="hidden lg:block text-sm text-muted-foreground">
        {format(new Date(post.pub_date), "MMM d, yyyy")}
      </div>
      <div className=" max-w-lg">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="mb-2 py-2">
            {post.source}
          </Badge>
          <div className="text-sm text-muted-foreground sm:hidden">
            {format(new Date(post.pub_date), "MMM d, yyyy")}
          </div>
        </div>
        <img
          src={post.img_url}
          alt={post.title}
          className="w-full h-auto mb-1 rounded-md sm:hidden"
        />
        <Link href={post.link} className="hover:underline">
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        </Link>
        <p className="text-base mb-2">{post.content}</p>
        {/* {fields.creator && (
          <p className="text-sm text-muted-foreground">By {fields.creator}</p>
        )} */}
        <div className="flex justify-end">
          <Link href={`/article/${post.id}`}>
            <Button variant="outline" className="mt-2">
              Read AI Summary
            </Button>
          </Link>
        </div>
      </div>
      <div className="hidden sm:block">
        <div className="flex lg:hidden justify-end text-sm text-muted-foreground mb-4 mt-3">
          {format(new Date(post.pub_date), "MMM d, yyyy")}
        </div>
        <img
          src={post.img_url}
          alt={post.title}
          className="w-full h-auto mb-1 rounded-md"
        />
      </div>
    </Alert>
  );
}
