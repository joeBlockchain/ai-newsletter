"use server";

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
