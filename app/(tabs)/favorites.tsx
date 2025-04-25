import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { H1, H2 } from "tamagui";

const favorites = () => {
  return (
    <View style={style.center}>
      <Text>Welcome to favorites</Text>
      <H1>asdas</H1>
    </View>
  );
};

export default favorites;

const style = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
