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
        id: Faker.random.number(1000),
        publishedAt: Faker.date.recent().toISOString(),
        source: {
          id: Faker.random.uuid(),
          name: Faker.company.companyName()
        },
        state: "progress",
        title: Faker.lorem.sentence(),
        url: Faker.internet.url(),
        urlToImage: `https://loremflickr.com/320/240?random=${Faker.random.number()}`
      }));
    // tslint:disable-next-line:no-empty
    const onPress = () => {};
    return <TopNewsList news={news} onPress={onPress} />;
  })
  .add("loading", () => <TopNewsList loading={true} news={[]} />);
