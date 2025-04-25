import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, H1, H2, H3, H5 } from "tamagui";

import { useTranslation } from "react-i18next";
import { Link } from "expo-router";

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <H3 style={styles.title}>{t("welcomeMsg")}</H3>
      <H5 style={styles.subtitle}>{t("subWelcomeMsg")}</H5>
      <Button onPress={onClickButton}>Öner</Button>
      <Link href="/settings">ayarlar</Link>
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
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    color: "#666",
    marginTop: 8,
  },
});

export default HomePage;
