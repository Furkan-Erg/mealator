import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useCallback } from "react";
import { H1, H2, YStack } from "tamagui";
import useMealStore from "../stores/mealStore";
import { CardComponent } from "../components/CardComponent";
import { t } from "i18next";
import API_URLS from "@/constants/apiUrls";
import api from "@/api";
import { BaseResponse } from "@/models/BaseResponse";
import { useFocusEffect } from "expo-router";
import { MealModel } from "@/models/MealModel";

const Favorites = () => {
  const { favoriteMealList, removeFavoriteMeal, addFavoriteMeal } = useMealStore();
  const toggleFavoriteItem = (meal: MealModel) => {
    api.post(API_URLS.MEAL + API_URLS.FAVORITE.replace("{id}", meal.id.toString()))
      .then((response) => {
        useMealStore.getState().favoriteMealList.some((m) => m.id == meal.id) ? removeFavoriteMeal(meal.id) : addFavoriteMeal(meal);
      })
      .catch((error) => {
        console.error("Error adding to favorites:", error);
      }
      );
  }

  const getFavoriteMealList = () => {
    api.get(API_URLS.MEAL + API_URLS.FAVORITELIST).then((response) => {
      const responseData: BaseResponse<MealModel[]> = response.data;
      if (responseData.success) {
        useMealStore.setState({ favoriteMealList: responseData.data });
      }
    })
      .catch((error) => {
        console.error("Error fetching favorite meal list:", error);
      }
      );
  }
  useFocusEffect(useCallback(() => {
    getFavoriteMealList();
  }, []));

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
          <CardComponent list={favoriteMealList} toggleFavoriteItem={toggleFavoriteItem} />
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
