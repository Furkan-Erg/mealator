import React, { useCallback, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import { H2, H5, Button, Checkbox, Label, XStack, CheckboxProps } from "tamagui";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import { t } from "i18next";
import Ionicons from "@expo/vector-icons/Ionicons";
import useMealStore from "@/app/stores/mealStore";
import { Meal } from "@/app/states/mealState";
import axios from "axios";
import API_URLS from "@/constants/apiUrls";
import { MealModel } from "@/models/MealModel";
import { BaseModel } from "@/models/BaseModel";

const MealDetailPage = () => {
    const { id } = useLocalSearchParams();
    const { addToShoppingList, shoppingList } = useMealStore();
    const [meal, setMeal] = useState<MealModel>();
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setSelectedIngredients([]);
            };
        }, [])
    );



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

    const getMealById = async () => {
        axios.get(API_URLS.BASE_URL + API_URLS.MEAL + API_URLS.GETBYID.replace("{id}", id as string))
            .then((response) => {
                const data: BaseModel<MealModel> = response.data;
                if (data.success) {
                    setMeal(data.data);
                } else {
                    console.error("Error fetching meal by ID:", data.errorMessage);
                }
            }).catch((error) => {
                console.error("Error fetching meal by ID:", error);
            })
    }
    useFocusEffect(
        useCallback(() => {
            getMealById();
        }
            , [id])
    );
    if (!meal) {
        return (
            <View style={styles.centered}>
                <Text>{t('noFoodFound')}</Text>
            </View>
        );
    }


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <H2 style={styles.title}>{meal?.name}</H2>
            <H5 style={styles.description}>{meal?.description}</H5>

            <H5 mt="$4" mb="$2">{t('ingredients')}</H5>
            <View style={styles.ingredientBox}>
                {meal?.ingredients?.map((ingredient) => (
                    <View key={ingredient} style={styles.ingredientRow}>
                        <CheckboxWithLabel
                            size="$4"
                            label={ingredient}
                            nonCheckableList={shoppingList}
                        />
                    </View>
                ))}
            </View>

            <H5 mt="$4" mb="$2">{t('nutritionInfo')}</H5>
            <View style={styles.nutritionBox}>
                <View style={styles.nutritionRow}>
                    <Text>{t('calories')}:</Text>
                    <Text>{`${meal?.nutritionInfo?.calories} kcal`}</Text>
                </View>
                <View style={styles.nutritionRow}>
                    <Text>{t('protein')}:</Text>
                    <Text>{`${meal?.nutritionInfo?.protein}g`}</Text>
                </View>
                <View style={styles.nutritionRow}>
                    <Text>{t('carbs')}:</Text>
                    <Text>{`${meal?.nutritionInfo?.carbs}g`}</Text>
                </View>
                <View style={styles.nutritionRow}>
                    <Text>{t('fat')}:</Text>
                    <Text>{`${meal?.nutritionInfo?.fat}g`}</Text>
                </View>
            </View>

            {selectedIngredients.length > 0 && (
                <Button
                    theme="green"
                    mt="$4"
                    onPress={addToShopList}
                    fontWeight="bold"
                    style={styles.addButton}
                >
                    {t("addToShoppingList", { count: selectedIngredients.length })}
                </Button>
            )}
        </ScrollView>
    );
    //TODO: what kind of uggly hack is this? fix it later -> create a new component for checkbox with label
    function CheckboxWithLabel({
        size,
        label,
        nonCheckableList,
        ...checkboxProps
    }: CheckboxProps & { label: string, nonCheckableList: Array<string> }) {
        const isNonCheckable = nonCheckableList.some((item) => item === label);

        return (
            <XStack width="100%" alignItems="center" gap="$2" onPress={() => toggleIngredient(label)}>
                {!isNonCheckable && (
                    <Checkbox id={label} size={size} {...checkboxProps} checked={selectedIngredients.includes(label)}>
                        <Checkbox.Indicator>
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
        backgroundColor: "#f9f9f9",
        minHeight: "100%",
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#333",
        marginBottom: 10,
        textTransform: "capitalize",
        alignSelf: "center"
    },
    description: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
        fontStyle: "italic",
    },
    ingredientBox: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    ingredientRow: {
        width: "50%",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    addButton: {
        marginTop: 15,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: "100%",
    },
    nutritionBox: {
        backgroundColor: "#E9F9D4",
        width: "100%",
        padding: 10,
    },
    nutritionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
});

export default MealDetailPage;