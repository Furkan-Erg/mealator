import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { H1, H2, YStack } from "tamagui";
import useMealStore from "../stores/mealStore";
import { CardComponent } from "../components/CardComponent";
import { t } from "i18next";

const Favorites = () => {
  const { favoriteMealList } = useMealStore();

  return (
    <View style={styles.container}>
      <YStack space="$4" style={styles.header}>
        <H1 style={styles.title}>{t('favorites')}</H1>
        <Text style={styles.subtitle}>{t('yourFavoriteMeals')}</Text>
      </YStack>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {favoriteMealList.length === 0 ? (
          <Text style={styles.emptyText}>{t('noFavoritesYet')}</Text>
        ) : (
          <CardComponent list={favoriteMealList} />
        )}
      </ScrollView>
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  scrollView: {
    paddingBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});
