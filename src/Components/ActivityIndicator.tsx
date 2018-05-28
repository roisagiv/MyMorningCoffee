import React from "react";
import { ActivityIndicator as RNActivityIndicator, View } from "react-native";
import { DefaultTheme } from "../Theme/DefaultTheme";

const ActivityIndicator: React.SFC<{}> = () => {
  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
      }}
    >
      <RNActivityIndicator color={DefaultTheme.colors.text} />
    </View>
  );
};

export default ActivityIndicator;
