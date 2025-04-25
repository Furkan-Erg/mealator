import { View, Text, Button, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

export default function Settings() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Button title={t("english")} onPress={() => i18n.changeLanguage("en")} />
      <Button title={t("turkish")} onPress={() => i18n.changeLanguage("tr")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
