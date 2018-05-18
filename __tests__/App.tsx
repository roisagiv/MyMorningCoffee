import React from "react";
import "react-native";
import App from "../App";

/* tslint:disable:no-implicit-dependencies */
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<App />);
  expect(tree).not.toBeNull();
});
