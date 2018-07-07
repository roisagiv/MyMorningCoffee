/* tslint:disable:no-implicit-dependencies */
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { Paper } from "react-native-paper";

import NewsItem from "./NewsItem";

storiesOf("NewsItem", module)
  .addDecorator(story => {
    return <Paper style={{ elevation: 4 }}>{story()}</Paper>;
  })
  .add("scraped", () => {
    const newsItem = {
      coverImage: "https://picsum.photos/640/320?random",
      description:
        "A last-ditch effort by the Trump administration failed to get China to accept its demand for a $200 billion cut in the U.S. bilateral trade deficit, as Chinese officials resisted committing to any specific targets.",
      id: 1234,
      // tslint:disable-next-line:no-empty
      onPress: (id: number) => {},
      publishedAt: "2018-05-19T19:06:43Z",
      source: "The Wall Street Journal",
      title: "China Rejects US Target for Narrowing Trade Gap",
      url:
        "https://www.wsj.com/articles/china-rejects-u-s-target-for-narrowing-trade-gap-1526756661"
    };
    return <NewsItem {...newsItem} />;
  })
  .add("loading", () => {
    const newsItem = {
      id: 1234,
      loading: true,
      // tslint:disable-next-line:no-empty
      onPress: (id: number) => {},
      publishedAt: "2018-05-19T19:06:43Z",
      title: "China Rejects US Target for Narrowing Trade Gap",
      url:
        "https://www.wsj.com/articles/china-rejects-u-s-target-for-narrowing-trade-gap-1526756661"
    };
    return <NewsItem {...newsItem} />;
  });
