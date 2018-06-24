import React from "react";
import { Navigation } from "react-native-navigation";
import {
  Provider as PaperProvider,
  Toolbar,
  ToolbarBackAction
} from "react-native-paper";
import StorybookUI from "../../storybook/storybook";
import { DefaultTheme } from "../Theme/DefaultTheme";

interface IProps {
  componentId?: string;
}
export class StorybookScreen extends React.Component<IProps, {}> {
  public render() {
    return (
      <PaperProvider theme={DefaultTheme}>
        <Toolbar title="Storybook">
          <ToolbarBackAction onPress={this.onBackPress} />
        </Toolbar>
        <StorybookUI {...this.props} />
      </PaperProvider>
    );
  }

  private onBackPress = () => {
    Navigation.pop(this.props.componentId, {});
  };
}
