import { Stack } from "expo-router";
import { createTamagui, TamaguiProvider } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";

import "../i18n";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

const config = createTamagui(defaultConfig);

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <TamaguiProvider config={config}>
        <Stack screenOptions={{ headerShown: false }}></Stack>
      </TamaguiProvider>
    </I18nextProvider>
  );
}
