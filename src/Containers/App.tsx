import { Navigation } from "react-native-navigation";
import registerScreens, { Screens } from "../Screens";

export default function start() {
  registerScreens();

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {
        visible: false
      }
    });

    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                id: Screens.topNews.id,
                name: Screens.topNews.name
              }
            }
          ]
        }
      }
    });
  });
}
