"use server";

import Airtable from "airtable";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

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

export async function getAIArticleByRSSID(
  rssID: string
): Promise<AIArticle & { img_url?: string }> {
  console.log("Getting AI article by RSSID:", rssID);

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: ai_article } = await supabase
    .from("article_view")
    .select()
    .eq("rss_feed_id", rssID)
    .single();

  const { data: data_img_url } = await supabase
    .from("rss_feed")
    .select("img_url")
    .eq("id", rssID)
    .single();

  console.log(data_img_url);

  return {
    ...ai_article,
    img_url: data_img_url?.img_url
  };
}

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

// Add this function
export async function getBlogPosts() {
  console.log("Getting blog posts");

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: blog_posts } = await supabase
    .from("rss_feed")
    .select()
    .order("pub_date", { ascending: false })
    .filter("should_draft_article", "eq", true);

  return blog_posts;
}
