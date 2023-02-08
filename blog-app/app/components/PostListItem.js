import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const IMAGE_WIDTH = 100;

const PostListItem = ({ post }) => {
  const { thumbnail, title, createdAt } = post;
  const getThumbnail = (uri) => {
    if (uri) return { uri };
    return require("../../assets/blank.jpg");
  };
  return (
    <TouchableOpacity style={[styles.container, { flexDirection: "row" }]}>
      <Image
        source={getThumbnail(thumbnail)}
        style={{ width: IMAGE_WIDTH, height: IMAGE_WIDTH / 1.7 }}
      />
      <View style={{ flex: 1, marginLeft: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#383838" }}>
          {title}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#d3d3d3" }}>
          {createdAt}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PostListItem;

const styles = StyleSheet.create({
  container: {},
});
