import { Navigation } from "react-native-navigation";
import { FullArticleScreen } from "../FullArticle/FullArticleScreen";
import { TopNewsListScreen } from "../TopNews/TopNewsListScreen";

export default function registerScreens() {
  Navigation.registerComponent(Screens.topNews.name, () => TopNewsListScreen);

  Navigation.registerComponent(
    Screens.fullArticle.name,
    () => FullArticleScreen
  );

  if (__DEV__) {
    const Storybook = require("../Storybook/StorybookScreen");
    Navigation.registerComponent(
      Screens.storybook.name,
      () => Storybook.StorybookScreen
    );
  }
}

export const Screens = {
  fullArticle: { name: "/full-article", id: "full-article" },
  storybook: { name: "/storybook", id: "storybook" },
  topNews: { name: "/", id: "top" }
};
