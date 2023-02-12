import React from "react";
import { View, StyleSheet } from "react-native";

const Seperator = ({
  width = "100%",
  height = 1,
  backgroundColor = "#d3d3d3",
  style
}) => {
  return (
    <View style={[{ width, height, backgroundColor, alignSelf: "center" }, style]} />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Seperator;
