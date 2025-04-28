import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { H1, H2, YStack } from "tamagui";
import useMealStore from "../stores/mealStore";
import { CardComponent } from "../components/CardComponent";
import { t } from "i18next";

const favorites = () => {
  const { favoriteMealList } = useMealStore()
  return (
    <View style={style.center}>
      <YStack  >
        <ScrollView showsVerticalScrollIndicator={false}>
          <CardComponent list={favoriteMealList}></CardComponent>
        </ScrollView>
      </YStack>

    </View>
  );
};

export default favorites;

const style = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
