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
import { INewsItem } from "../../Models";

interface IProps {
  newsItem: INewsItem;
  onPress?: (item: INewsItem) => void;
}

export default class NewsItem extends React.PureComponent<IProps> {
  public render() {
    const { newsItem, onPress } = this.props;
    const time = timeago().format(newsItem.publishedAt);
    const imageUrl = newsItem.urlToImage
      ? { source: { uri: newsItem.urlToImage } }
      : {};

    return (
      <Card elevation={0} onPress={this.onItemPress}>
        <ListItem title={newsItem.source.name} description={time} />
        <CardCover {...imageUrl} />
        <CardContent>
          <Title numberOfLines={2}>{newsItem.title}</Title>
          <Paragraph numberOfLines={3}>{newsItem.description}</Paragraph>
        </CardContent>
      </Card>
    );
  }

  private onItemPress = () => {
    const item = this.props.newsItem;
    this.props.onPress(item);
  };
}
