import { Navigation } from "react-native-navigation";
import StorybookUI from "./storybook";

Navigation.registerComponent("storybook", () => StorybookUI);
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: "storybook"
                        }
                    }
                ],
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        }
    });
});