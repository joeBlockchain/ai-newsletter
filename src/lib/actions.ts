"use server";

import Airtable from "airtable";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export type AIArticle = {
  id: string;
    rss_feed_id: number; // bigint
    title: string; // text
    content: string; // text
};

export async function getAIArticleByRSSID(
  rssID: string
): Promise<AIArticle & { img_url?: string }> {
  console.log("Getting AI article by RSSID:", rssID);

  const supabase = createClient();

  const { data: ai_article } = await supabase
    .from("ai_articles")
    .select()
    .eq("rss_feed_id", rssID)
    .single();

  const { data: data_img_url } = await supabase
    .from("rss_feed")
    .select("img_url, title, pub_date")
    .eq("id", rssID)
    .single();

  return {
    ...ai_article,
    img_url: data_img_url?.img_url ?? "",
    title: data_img_url?.title ?? "",
    pub_date: data_img_url?.pub_date ?? ""
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

  const supabase = createClient();

  const { data: blog_posts } = await supabase
    .from("rss_feed")
    .select()
    .order("pub_date", { ascending: false })
    .filter("should_draft_article", "eq", true);

  return blog_posts;
}
