import React from "react";
import { Toolbar as PaperToolBar, ToolbarContent } from "react-native-paper";

interface IToolbarProps {
  title: string;
}

const Toolbar: React.SFC<IToolbarProps> = ({ title }) => {
  return (
    <PaperToolBar>
      <ToolbarContent title={title} />
    </PaperToolBar>
  );
};

export default Toolbar;
