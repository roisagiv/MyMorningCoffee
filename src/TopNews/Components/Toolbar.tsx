import React from "react";
import {
  Toolbar as PaperToolBar,
  ToolbarAction,
  ToolbarContent
} from "react-native-paper";

interface IToolbarProps {
  title: string;
  onDevModePress: () => void;
}

const Toolbar: React.SFC<IToolbarProps> = ({ title, onDevModePress }) => {
  return (
    <PaperToolBar>
      <ToolbarContent title={title} />
      {__DEV__ && <ToolbarAction icon="book" onPress={onDevModePress} />}
    </PaperToolBar>
  );
};

export default Toolbar;
