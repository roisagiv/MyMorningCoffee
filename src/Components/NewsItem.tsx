import * as React from "react";
import {
  Card,
  CardContent,
  CardCover,
  ListItem,
  Paragraph,
  Title
} from "react-native-paper";
import timeago from "timeago.js";
import { INewsItem } from "../Models/NewsItem";

interface IProps {
  newsItem: INewsItem;
}

const NewsItem: React.SFC<IProps> = props => {
  const { newsItem } = props;
  const time = timeago().format(newsItem.publishedAt);
  const imageUrl = newsItem.urlToImage
    ? { source: { uri: newsItem.urlToImage } }
    : {};

  return (
    <Card elevation={0} style={{ margin: 0 }}>
      <ListItem title={newsItem.source.name} description={time} />
      <CardCover {...imageUrl} />
      <CardContent>
        <Title numberOfLines={2}>{newsItem.title}</Title>
        <Paragraph numberOfLines={3}>{newsItem.description}</Paragraph>
      </CardContent>
    </Card>
  );
};

export default NewsItem;
