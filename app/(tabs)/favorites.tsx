import { View, Text, StyleSheet } from "react-native";
import React from "react";

const favorites = () => {
  return (
    <View style={style.center}>
      <Text>Welcome to favorites</Text>
    </View>
  );
};

export default favorites;

const style = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
