import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";

type BlogPostProps = {
  post: {
    id: string;
    fields: Record<string, any>;
  };
};

async function getUnsplashImage(keyword: string): Promise<string> {
  const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!unsplashAccessKey) {
    console.error("Unsplash API key is not configured");
    return "https://source.unsplash.com/random";
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
        keyword
      )}&client_id=${unsplashAccessKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch image from Unsplash");
    }

    const data = await response.json();
    return data.urls.regular;
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    return "https://source.unsplash.com/random";
  }
}

export default async function BlogPostCard({ post }: BlogPostProps) {
  const keywords = JSON.parse(post.fields.Keywords || "[]");
  const firstKeyword = keywords[0] || "blog";
  const imageUrl = await getUnsplashImage(firstKeyword);

  return (
    <div>
      <div className="flex flex-row justify-between mx-2 my-3">
        <p className="text-sm text-muted-foreground">{post.fields.Source}</p>
        <p className="text-sm text-muted-foreground ">
          {format(new Date(post.fields.Date), "MMM dd yyyy")}
        </p>
      </div>
      <Card className="flex flex-col h-full overflow-hidden">
        <CardHeader className="relative p-0 overflow-hidden h-48">
          <img
            src={imageUrl}
            alt={post.fields.Title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </CardHeader>
        <CardContent className="flex-grow mt-4">
          <h3 className="text-2xl font-semibold leading-snug tracking-wide">
            {post.fields.Title}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {keywords.map((keyword: string, index: number) => (
              <Badge key={index} variant="secondary">
                {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Link href={`/${post.id}`}>
            <Button variant="secondary">Read more</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
