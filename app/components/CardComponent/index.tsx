import Ionicons from "@expo/vector-icons/Ionicons";
import type { CardProps } from "tamagui";
import {
  Card,
  H4,
  H5,
  H6,
  Paragraph,
  View,
  XStack,
} from "tamagui";
import { useFocusEffect, useRouter } from "expo-router";
import useMealStore from "@/app/stores/mealStore";
import { StyleSheet, } from "react-native";
import { MealModel } from "@/models/MealModel";
import { use, useCallback, useEffect, useState } from "react";

export function CardComponent({ list, toggleFavoriteItem }: { list?: any[], toggleFavoriteItem: (meal: MealModel) => void }) {
  return (
    <View style={styles.mealsBox}>
      {list &&
        list.length > 0 && list?.map((item, index) => {
          return (
            <DemoCard
              key={index}
              name={item?.name}
              id={item?.id}
              description={item?.description}
              ingredients={item?.ingredients}
              toggleFavoriteItem={toggleFavoriteItem}
              width={150}
              height={175}
            />
          );
        })}
    </View>
  );
}

export function DemoCard({
  id,
  name,
  description,
  ingredients,
  toggleFavoriteItem,
  ...props
}: CardProps & { id: number; name: string; description: string, ingredients: string[], showDescription?: boolean, toggleFavoriteItem: (meal: MealModel) => void }) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePress = () => {
    router.push(`/details/${id}`);
  };

  const handleBookmarkPress = () => {
    toggleFavoriteItem({ id, name, description, ingredients });
    setIsFavorite(!isFavorite)
  }

  useFocusEffect(
    useCallback(() => {
      const favoriteMeals = useMealStore.getState().favoriteMealList;
      const isFavoriteMeal = favoriteMeals.some((meal) => meal.id === id);
      setIsFavorite(isFavoriteMeal);
    }
      , [id])
  );

  return (
    <Card bordered {...props} onPress={handlePress} margin={10} >
      <Card.Header padded>
        <H6>{name}</H6>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Ionicons name="bookmark" size={32} color="grey" onPress={handleBookmarkPress} style={isFavorite ? { color: 'red' } : ''} />
      </Card.Footer>
    </Card>
  );
}



const styles = StyleSheet.create({
  icon: {
    position: "absolute",
  },
  mealsBox: {
    flexDirection: "row",
    flexWrap: "wrap",
  }
});
