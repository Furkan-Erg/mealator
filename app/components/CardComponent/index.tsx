import Ionicons from "@expo/vector-icons/Ionicons";
import type { CardProps } from "tamagui";
import {
  Button,
  Card,
  H2,
  Image,
  Paragraph,
  ScrollView,
  styled,
  XStack,
  YStack,
} from "tamagui";

export function CardComponent({ list }: { list?: any[] }) {
  return (
    list &&
    list.length > 0 && (
      <YStack height="300px">
        <ScrollView horizontal space>
          {list?.map((item, index) => {
            return (
              <DemoCard
                key={index}
                name={item.name}
                description={item.description}
                width={250}
                height={300}
              />
            );
          })}
        </ScrollView>
      </YStack>
    )
  );
}

export function DemoCard({
  name,
  description,
  ...props
}: CardProps & { name?: string; description?: string }) {
  const HoverableIcon = styled(Ionicons, {
    hoverStyle: {
      scale: 1.2,
      color: "red",
    },
    pressStyle: {
      scale: 1.2,
      color: "red",
    },
    transition: "all 0.2s ease-in-out",
  });

  return (
    <Card elevate bordered {...props}>
      <Card.Header padded>
        <H2>{name}</H2>
        <Paragraph theme="alt2">{description}</Paragraph>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <HoverableIcon name="bookmark" size={32} color="grey" />
      </Card.Footer>
      <Card.Background></Card.Background>
    </Card>
  );
}

const styles = {
  icon: {
    position: "absolute",
  },
};
