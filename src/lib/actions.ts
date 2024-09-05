"use server";

import Airtable from "airtable";

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

export async function getAIArticles(): Promise<AIArticle[]> {
  console.log("Getting AI articles");

  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appSMEQ0b0QCb3Gi0"
  );

  return new Promise((resolve, reject) => {
    const articles: AIArticle[] = [];
    base("aiArticles")
      .select({
        pageSize: 12,
        view: "Grid view",
        sort: [{ field: "createdTime", direction: "desc" }],
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            articles.push({
              id: record.id,
              fields: record.fields as AIArticle["fields"],
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error("Error fetching AI articles:", err);
            reject(err);
            return;
          }
          resolve(articles);
        }
      );
  });
}

export async function getAIArticleByRSSID(
  rssID: string
): Promise<AIArticle | null> {
  console.log("Getting AI article by RSSID:", rssID);

  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appSMEQ0b0QCb3Gi0"
  );

  console.log("RSSID:", rssID);

  return new Promise((resolve, reject) => {
    base("aiArticles")
      .select({
        filterByFormula: `{rssID} = '${rssID}'`,
        maxRecords: 1,
      })
      .firstPage((err, records) => {
        if (err) {
          console.error("Error fetching AI article:", err);
          reject(err);
          return;
        }
        if (records && records.length > 0) {
          const article: AIArticle = {
            id: records[0].id,
            fields: records[0].fields as AIArticle["fields"],
          };
          resolve(article);
        } else {
          resolve(null);
        }
      });
  });
}

export async function subscribeFormSubmit(email: string) {
  console.log(email);

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
