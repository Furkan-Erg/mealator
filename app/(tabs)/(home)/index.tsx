import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Mealator!</Text>
      <Text style={styles.subtitle}>Plan your meals with ease.</Text>
      <Button title="Get Started" onPress={onClickButton} />
    </View>
  );
};

const onClickButton = () => {
  console.log("Button Pressed!");
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
});

export default HomePage;
