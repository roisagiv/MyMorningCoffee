import * as React from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import {
  Caption,
  Card,
  CardContent,
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

const styles = StyleSheet.create({
  container: {
    borderRadius: DefaultTheme.roundness,
    height: 195,
    overflow: "hidden"
  },
  image: {
    flex: 1,
    height: null,
    padding: 16,
    width: null
  }
});

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
    const imageUrl = coverImage
      ? { source: { uri: coverImage } }
      : { source: {} };

    const textStyle = loading ? { color: DefaultTheme.colors.placeholder } : {};
    const imageStyle = loading ? { backgroundColor: Colors.grey50 } : {};

    return (
      <View testID={id.toString()}>
        <Card elevation={0} onPress={this.onItemPress}>
          <CardContent>
            <Subheading style={textStyle}>{source}</Subheading>
            <Caption style={textStyle}>{time}</Caption>
          </CardContent>
          <View style={[styles.container]}>
            <FastImage {...imageUrl} style={[imageStyle, styles.image]} />
          </View>
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
