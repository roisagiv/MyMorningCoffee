import * as React from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import {
  Card,
  CardContent,
  Colors,
  Paragraph,
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
  contentContainer: {
    alignContent: "stretch",
    flexDirection: "row"
  },
  coverImage: {
    flex: 1,
    height: null,
    padding: 16,
    width: null
  },
  coverImageContainer: {
    borderRadius: DefaultTheme.roundness,
    height: 195,
    overflow: "hidden"
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
          <CardContent style={styles.contentContainer}>
            <Paragraph style={[textStyle, { flex: 1 }]}>{source}</Paragraph>
            <Paragraph style={textStyle}>{time}</Paragraph>
          </CardContent>
          {coverImage || loading ? (
            <View style={[styles.coverImageContainer, { margin: 8 }]}>
              <FastImage
                {...imageUrl}
                style={[imageStyle, styles.coverImage]}
              />
            </View>
          ) : (
            <View />
          )}
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
