import React from "react";
import {
  Toolbar as PaperToolBar,
  ToolbarBackAction,
  ToolbarContent
} from "react-native-paper";

interface IToolbarProps {
  title: string;
  onBack: () => void;
}

const Toolbar: React.SFC<IToolbarProps> = ({ title, onBack }) => {
  return (
    <PaperToolBar>
      <ToolbarBackAction onPress={onBack} />
      <ToolbarContent title={title} />
    </PaperToolBar>
  );
};

export default Toolbar;
