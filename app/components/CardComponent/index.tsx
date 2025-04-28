import Ionicons from "@expo/vector-icons/Ionicons";
import type { CardProps } from "tamagui";
import {
  Card,
  H2,
  H4,
  Paragraph,
  XStack,
} from "tamagui";
import { useRouter } from "expo-router";
import { useState } from "react";
import useMealStore from "@/app/stores/mealStore";

export function CardComponent({ list, }: { list?: any[] }) {

  return (
    list &&
    list.length > 0 && (

      list?.map((item, index) => {
        return (
          <DemoCard
            key={index}
            name={item?.name}
            id={item?.id}
            description={item?.description}
            ingredients={item?.ingredients}
            width={250}
            height={200}
          />
        );
      })
    )
  );
}

export function DemoCard({
  id,
  name,
  description,
  ingredients,
  ...props
}: CardProps & { id: number; name: string; description: string, ingredients: string[] }) {
  const { favoriteMealList, addFavoriteMeal, removeFavoriteMeal } = useMealStore();
  const router = useRouter(); // router hook

  function isFavorite() {
    return favoriteMealList.some((meal) => meal.id === id);
  }

  const handlePress = () => {
    router.push(`/details/${id}`);
  };

  const handleBookmarkPress = () => {
    if (favoriteMealList.some((meal) => meal.id === id)) {
      removeFavoriteMeal(id);
    } else {
      addFavoriteMeal({ id, name, description, ingredients });
    }
  }

  return (
    <Card bordered {...props} onPress={handlePress} margin={10} >
      <Card.Header padded>
        <H4>{name}</H4>
        <Paragraph theme="alt2">{description}</Paragraph>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Ionicons name="bookmark" size={32} color="grey" onPress={handleBookmarkPress} style={isFavorite() ? { color: 'red' } : ''} />
      </Card.Footer>
    </Card>
  );
}


const styles = {
  icon: {
    position: "absolute",
  },
};
