import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, H1, H2, H3, H5 } from "tamagui";

import { useTranslation } from "react-i18next";
import { Link } from "expo-router";
import { CardComponent } from "@/app/components/CardComponent";

const HomePage = () => {
  const { t } = useTranslation();
  const [cardList, setCardList] = useState([]);
  return (
    <View style={styles.container}>
      <H3 style={styles.title}>{t("welcomeMsg")}</H3>
      <H5 style={styles.subtitle}>{t("subWelcomeMsg")}</H5>
      <Button
        onPress={onClickButton}
        size="$4"
        theme="red"
        width="$12"
        my="$4"
        fontWeight="bold"
      >
        {t("suggestMeal")}
      </Button>
      <CardComponent list={cardList}></CardComponent>
      <Link href="/settings" style={{ marginTop: 20 }}>
        {t("settings")}
      </Link>
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
