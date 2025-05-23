import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, H3, H5, ScrollView, YStack } from "tamagui";
import { useTranslation } from "react-i18next";
import { Link } from "expo-router";
import { CardComponent } from "@/app/components/CardComponent";
import useMealStore from "@/app/stores/mealStore";
import { Meal } from "@/app/states/mealState";
import Login from "@/app/components/AuthComponents/login";
import useUserStore from "@/app/stores/userStore";
import api from "@/api";
import API_URLS from "@/constants/apiUrls";
import { MealModel } from "@/models/MealModel";
const HomePage = () => {
  const { favoriteMealList, removeFavoriteMeal, addFavoriteMeal } = useMealStore();

  const { t } = useTranslation();
  const { mealList } = useMealStore();
  const { userToken } = useUserStore();

  const getRandomMeals = (mealList: Array<Meal>) => {
    const shuffledMeals = [...mealList].sort(() => Math.random() - 0.5);
    return shuffledMeals.slice(0, 3);
  };

  const [cardList, setCardList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onClickButton = () => {
    setCardList(getRandomMeals(mealList));
  };

  const toggleFavoriteItem = (meal: MealModel) => {
    api.post(API_URLS.MEAL + API_URLS.FAVORITE.replace("{id}", meal.id.toString()))
      .then((response) => {
        favoriteMealList.includes(meal) ? removeFavoriteMeal(meal.id) : addFavoriteMeal(meal);
      })
      .catch((error) => {
        console.error("Error adding to favorites:", error);
      }
      );
  }


  useEffect(() => {
    const checkLoginStatus = async () => {
      setIsLoggedIn(!!userToken);
    };
    checkLoginStatus();
  }
    , [userToken]);

  return (
    isLoggedIn ? (<View style={styles.container}>
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
      <YStack height={310} >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CardComponent list={cardList} toggleFavoriteItem={toggleFavoriteItem}></CardComponent>
        </ScrollView>
      </YStack>
      <Link href="/settings" style={{ marginTop: 20 }}>
        {t("settings")}
      </Link>
    </View>) : (<Login></Login>)

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
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
