/* tslint:disable:no-implicit-dependencies */
import { storiesOf } from "@storybook/react-native";
import React from "react";

import NewsItem from "./NewsItem";

storiesOf("NewsItem", module).add("default", () => {
  const newsItem = {
    author: "Bob Davis",
    description:
      "A last-ditch effort by the Trump administration failed to get China to accept its demand for a $200 billion cut in the U.S. bilateral trade deficit, as Chinese officials resisted committing to any specific targets.",
    publishedAt: "2018-05-19T19:06:43Z",
    source: {
      id: "the-wall-street-journal",
      name: "The Wall Street Journal"
    },
    title: "China Rejects US Target for Narrowing Trade Gap",
    url:
      "https://www.wsj.com/articles/china-rejects-u-s-target-for-narrowing-trade-gap-1526756661",
    urlToImage: "https://images.wsj.net/im-11275/social"
  };
  return <NewsItem newsItem={newsItem} />;
});
