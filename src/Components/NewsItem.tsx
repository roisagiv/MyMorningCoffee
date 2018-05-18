import * as React from "react";
import {
  Card,
  CardContent,
  CardCover,
  ListItem,
  Paragraph,
  Title
} from "react-native-paper";
import { INewsItem } from "../Models/NewsItem";

interface IProps {
  newsItem: INewsItem;
}

export default class NewsItem extends React.Component<IProps, {}> {
  public render() {
    const { newsItem } = this.props;
    return (
      <Card>
        <ListItem title={newsItem.source.name} description="12 min ago" />
        <CardCover
          source={{
            uri: newsItem.urlToImage
          }}
        />
        <CardContent>
          <Title>{newsItem.title}</Title>
          <Paragraph>{newsItem.description}</Paragraph>
        </CardContent>
      </Card>
    );
  }
}
