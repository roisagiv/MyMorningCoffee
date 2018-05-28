/* tslint:disable:no-implicit-dependencies */
import { storiesOf } from "@storybook/react-native";
import Faker from "faker";
import React from "react";

import { INewsItem } from "../../Models";
import TopNewsList from "./TopNewsList";

storiesOf("TopNewsList", module)
  .add("default", () => {
    const numberOfItems = 5;
    const news: INewsItem[] = Array(numberOfItems)
      .fill({})
      .map(() => ({
        author: Faker.name.title(),
        description: Faker.lorem.paragraph(),
        publishedAt: Faker.date.recent().toISOString(),
        source: {
          id: Faker.random.uuid(),
          name: Faker.company.companyName()
        },
        title: Faker.lorem.sentence(),
        url: Faker.internet.url(),
        urlToImage: `https://loremflickr.com/320/240?random=${Faker.random.number()}`
      }));
    return <TopNewsList news={news} />;
  })
  .add("loading", () => <TopNewsList loading={true} news={[]} />);
