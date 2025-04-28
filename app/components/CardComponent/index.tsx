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
import { useRouter } from "expo-router";
import useMealStore from "@/app/stores/mealStore";
import { StyleSheet, } from "react-native";

export function CardComponent({ list, }: { list?: any[], }) {
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
  ...props
}: CardProps & { id: number; name: string; description: string, ingredients: string[], showDescription?: boolean }) {
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
        <H6>{name}</H6>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Ionicons name="bookmark" size={32} color="grey" onPress={handleBookmarkPress} style={isFavorite() ? { color: 'red' } : ''} />
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
