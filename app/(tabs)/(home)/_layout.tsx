import { Stack } from "expo-router";
import useMealStore from "@/app/stores/mealStore";
import { t } from "i18next";
export default function HomeLayout() {
  const { mealList } = useMealStore();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: t('home') }} />
      <Stack.Screen
        name="details/[id]"
        options={{ title: t('mealDetails') }}
      />
    </Stack>
  );
}
