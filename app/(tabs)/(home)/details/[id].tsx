import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { H2, H4, H5, Button, Checkbox, Label, XStack } from "tamagui";
import type { CheckboxProps } from "tamagui";
import useMealStore from "@/app/stores/mealStore";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import { t } from "i18next";
import { Meal } from "@/app/states/mealState";
import Ionicons from "@expo/vector-icons/Ionicons";

const MealDetailPage = () => {
    const { id } = useLocalSearchParams();
    const { mealList, addToShoppingList, shoppingList } = useMealStore();

    const meal = mealList.find((m) => m.id === Number(id));
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

    if (!meal) {
        return (
            <View style={styles.centered}>
                <Text>Yemek bulunamadı.</Text>
            </View>
        );
    }

    const toggleIngredient = (ingredient: string) => {
        setSelectedIngredients((prev) =>
            prev.includes(ingredient)
                ? prev.filter((i) => i !== ingredient)
                : [...prev, ingredient]
        );
    };

    const addToShopList = () => {
        selectedIngredients.forEach((ingredient) => {
            addToShoppingList(ingredient);
        });
        setSelectedIngredients([]);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <H2 style={styles.title}>{meal.name}</H2>
            <H5 style={styles.description}>{meal.description}</H5>

            <H4 mt="$4" mb="$2">{t('ingredients')}</H4>
            {meal.ingredients.map((ingredient) => (
                <View key={ingredient} style={styles.ingredientRow}>
                    <CheckboxWithLabel
                        size="$4"
                        label={ingredient}
                        nonCheckableList={shoppingList}
                    />
                </View>
            ))}

            {selectedIngredients.length > 0 && (
                <Button
                    theme="green"
                    mt="$4"
                    onPress={addToShopList}
                    fontWeight="bold"
                >
                    {t("addToShoppingList", { count: selectedIngredients.length })}
                </Button>
            )}
        </ScrollView>
    );

    function CheckboxWithLabel({
        size,
        label,
        nonCheckableList,
        ...checkboxProps
    }: CheckboxProps & { label: string, nonCheckableList: Array<string> }) {
        const isNonCheckable = nonCheckableList.some((item) => item === label);

        return (
            <XStack width={300} alignItems="center" gap="$4" onPress={() => toggleIngredient(label)}>
                {!isNonCheckable && (
                    <Checkbox id={label} size={size} {...checkboxProps} checked={selectedIngredients.includes(label)}>
                        <Checkbox.Indicator >
                            <CheckIcon />
                        </Checkbox.Indicator>
                    </Checkbox>
                )}
                {isNonCheckable && (
                    <Ionicons name="checkmark-sharp" size={20} color="green" />
                )}
                <Label size={size} onPress={() => toggleIngredient(label)}>
                    {label}
                </Label>
            </XStack>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "flex-start",
    },
    title: {
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        color: "#666",
        marginBottom: 20,
    },
    ingredientRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default MealDetailPage;
