import * as React from "react";
import { View } from "react-native";
import {
  Caption,
  Card,
  CardContent,
  CardCover,
  Colors,
  Paragraph,
  Subheading,
  Title
} from "react-native-paper";
import timeago from "timeago.js";
import { DefaultTheme } from "../../Theme/DefaultTheme";

interface IProps {
  id: number;
  publishedAt?: string;
  coverImage?: string;
  source?: string;
  title: string;
  description?: string;
  loading?: boolean;
  onPress?: (id: number) => void;
}

export default class NewsItem extends React.PureComponent<IProps> {
  public render() {
    const {
      publishedAt,
      coverImage,
      id,
      source,
      title,
      description,
      loading
    } = this.props;
    const time = timeago().format(publishedAt);
    const imageUrl = coverImage ? { source: { uri: coverImage } } : {};

    const textStyle = loading ? { color: DefaultTheme.colors.placeholder } : {};
    const imageStyle = loading ? { backgroundColor: Colors.grey50 } : {};

    return (
      <View testID={id.toString()}>
        <Card elevation={0} onPress={this.onItemPress}>
          <CardContent>
            <Subheading style={textStyle}>{source}</Subheading>
            <Caption style={textStyle}>{time}</Caption>
          </CardContent>
          <CardCover {...imageUrl} style={imageStyle} />
          <CardContent>
            <Title numberOfLines={2} style={textStyle}>
              {title}
            </Title>
            <Paragraph numberOfLines={3} style={textStyle}>
              {description}
            </Paragraph>
          </CardContent>
        </Card>
      </View>
    );
  }

  private onItemPress = () => {
    const item = this.props.id;
    this.props.onPress(item);
  };
}
