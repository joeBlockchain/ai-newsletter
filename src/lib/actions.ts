"use server";

import Airtable from "airtable";

import { createClient } from "@/utils/supabase/server";

export type AIArticle = {
  id: number;
  rss_feed_id: number;
  title: string;
  content: string;
};

export type RSSFeed = {
  id: number;
  title: string;
  link: string;
  pub_date: string;
  content: string;
  content_snippet: string;
  guid: string;
  categories: string;
  img_url: string;
  source: string;
  should_draft_article: boolean;
};

export async function getAIArticleByRSSID(
  rssID: number
): Promise<AIArticle & Partial<RSSFeed>> {
  console.log("Getting AI article by RSSID:", rssID);

  const supabase = createClient();
  
  const { data: ai_article, error: ai_error } = await supabase
    .from("ai_articles")
    .select()
    .eq("rss_feed_id", rssID)
    .single();

  if (ai_error) throw ai_error;

  const { data: rss_feed, error: rss_error } = await supabase
    .from("rss_feed")
    .select("img_url, title, pub_date")
    .eq("id", rssID)
    .single();

  if (rss_error) throw rss_error;

  return {
    ...ai_article,
    img_url: rss_feed?.img_url ?? "",
    title: rss_feed?.title ?? ai_article.title,
    pub_date: rss_feed?.pub_date ?? ""
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
export async function getBlogPosts(page: number = 1, pageSize: number = 10): Promise<{ posts: RSSFeed[], total: number }> {
  console.log("Getting blog posts for page:", page);

  const supabase = createClient();

  // Calculate the range for pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data: blog_posts, error, count } = await supabase
    .from("rss_feed")
    .select("*", { count: 'exact' })
    .order("pub_date", { ascending: false })
    .filter("should_draft_article", "eq", true)
    .range(from, to);

  if (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }

  console.log("Fetched posts:", blog_posts?.length, "Total:", count);

  return { 
    posts: blog_posts as RSSFeed[] || [], 
    total: count ?? 0 
  };
}
