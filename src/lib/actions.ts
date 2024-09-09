"use server";

import Airtable from "airtable";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { cache } from "react";


export type AIArticle = {
  id: string;
    rss_feed_id: number; // bigint
    original_title: string; // text
    original_link: string; // text
    guid: string; // text
    pub_date: string; // timestamp with time zone
    original_content: string; // text
    content_snippet: string; // text
    categories: any; // jsonb
    iso_date: string; // timestamp with time zone
    ai_article_id: number; // bigint
    ai_title: string; // text
    ai_content: string; // text
    generated_at: string; // timestamp with time zone
    img_url?: string; // text
};

export const getAIArticleByRSSID = cache(async (rssID: string): Promise<AIArticle & { img_url?: string }> => {
  console.log("Getting AI article by RSSID:", rssID);

  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);

  // const { data: ai_article } = await supabase
  //   .from("article_view")
  //   .select()
  //   .eq("rss_feed_id", rssID)
  //   .single();

  // const { data: data_img_url } = await supabase
  //   .from("rss_feed")
  //   .select("img_url")
  //   .eq("id", rssID)
  //   .single();

  // console.log(data_img_url);

  const testPayload: AIArticle = {
    id: "",
    rss_feed_id: 0,
    original_title: "",
    original_link: "",
    guid: "",
    pub_date: "",
    original_content: "",
    content_snippet: "",
    categories: {},
    iso_date: "",
    ai_article_id: 0,
    ai_title: "",
    ai_content: "",
    generated_at: "",
    img_url: ""
  };

  const data_img_url = {
    img_url: ""
  };

  return {
    ...testPayload,
    img_url: data_img_url?.img_url
  };
});

export async function subscribeFormSubmit(email: string) {
  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appSMEQ0b0QCb3Gi0"
  );

  base("Subscribers").create(
    [
      {
        fields: {
          emailAddress: email,
        },
      },
    ],
    function (err: any, records: any) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record: any) {
        console.log(record.getId());
      });
    }
  );
}

export const getBlogPosts = cache(async () => {
  console.log("Getting blog posts");

  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);

  // const { data: blog_posts } = await supabase
  //   .from("rss_feed")
  //   .select()
  //   .order("pub_date", { ascending: false })
  //   .filter("should_draft_article", "eq", true);


  const blog_posts = {
    id: 1,
    title: "Sample Blog Post Title",
    link: "https://example.com/sample-blog-post",
    guid: "unique-guid-for-sample-post",
    pub_date: new Date().toISOString(),
    content: "This is the full content of the sample blog post.",
    content_snippet: "This is a snippet of the sample blog post.",
    categories: ["AI", "Technology"],
    iso_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    should_draft_article: false,
    img_url: "https://example.com/image.jpg",
    source: "Example RSS Feed",
  };

  return blog_posts;
});

// To use this with revalidation:
export async function getBlogPostsWithRevalidation(revalidate: number = 60) {
  const posts = await getBlogPosts();
  
  // This line sets up revalidation for this specific data fetch
  revalidate = revalidate;

  return posts;
}
