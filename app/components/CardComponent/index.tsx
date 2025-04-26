import Ionicons from "@expo/vector-icons/Ionicons";
import type { CardProps } from "tamagui";
import {
  Card,
  H2,
  Paragraph,
  XStack,
} from "tamagui";
import { useRouter } from "expo-router";

export function CardComponent({ list }: { list?: any[] }) {
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
            width={250}
            height={300}
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
  ...props
}: CardProps & { id?: number; name?: string; description?: string }) {
  const router = useRouter(); // router hook

  const handlePress = () => {
    router.push(`/details/${id}`);
  };

  return (
    <Card bordered {...props} onPress={handlePress} margin={10} >
      <Card.Header padded>
        <H2>{name}</H2>
        <Paragraph theme="alt2">{description}</Paragraph>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Ionicons name="bookmark" size={32} color="grey" />
      </Card.Footer>
    </Card>
  );
}


const styles = {
  icon: {
    position: "absolute",
  },
};
