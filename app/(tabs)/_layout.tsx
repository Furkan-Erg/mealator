import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function TabLayout() {
  const { t } = useTranslation();
  const [titles, setTitles] = useState({
    home: "",
    favorites: "",
    mealList: "",
    shoppingList: "",
    profile: "",
  });

  useEffect(() => {
    setTitles({
      home: t("home"),
      favorites: t("favorites"),
      mealList: t("mealList"),
      shoppingList: t("shoppingList"),
      profile: t("profile"),
    });
  }, [t]);

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="favorites"
        options={{
          title: titles.favorites,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(home)"
        options={{
          title: titles.home,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mealList"
        options={{
          title: titles.mealList,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pizza" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shoppingList"
        options={{
          title: titles.shoppingList,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: titles.profile,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
