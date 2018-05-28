import React from "react";
import {
  Toolbar as PaperToolBar,
  ToolbarBackAction,
  ToolbarContent
} from "react-native-paper";

interface IToolbarProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
}

const Toolbar: React.SFC<IToolbarProps> = ({ title, onBack, subtitle }) => {
  return (
    <PaperToolBar>
      <ToolbarBackAction onPress={onBack} />
      <ToolbarContent title={title} subtitle={subtitle} />
    </PaperToolBar>
  );
};

export default Toolbar;
