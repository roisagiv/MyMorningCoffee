import { Navigation } from "react-native-navigation";
import { FullArticleScreen } from "../FullArticle/FullArticleScreen";
import { TopNewsListScreen } from "../TopNews/TopNewsListScreen";

export default function registerScreens() {
  Navigation.registerComponent(Screens.topNews.name, () => TopNewsListScreen);
  Navigation.registerComponent(
    Screens.fullArticle.name,
    () => FullArticleScreen
  );
}

export const Screens = {
  fullArticle: { name: "/full-article", id: "full-article" },
  topNews: { name: "/", id: "top" }
};
