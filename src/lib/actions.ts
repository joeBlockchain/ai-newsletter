"use server";

import Airtable from "airtable";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export type AIArticle = {
  id: string;
  fields: {
    content: string;
    contentSnipit: string;
    createdTime: string;
    ID: number;
    lastModified: string;
    model: string;
    rssGUID: string;
    rssID: string;
    title: string;
  };
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
