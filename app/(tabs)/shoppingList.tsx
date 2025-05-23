import api from "@/api";
import API_URLS from "@/constants/apiUrls";
import { IngredientModel } from "@/models/IngredientModel";
import { ShoppingListModel } from "@/models/ShoppingListModel";
import { useFocusEffect } from "expo-router";
import { t } from "i18next";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ShoppingListPage = () => {
    const [shoppingList, setShoppingList] = useState<ShoppingListModel>();
    const removeFromShoppingList = (ingredientId: number) => {
        api
            .delete(
                API_URLS.SHOPPINGLIST +
                API_URLS.INGREDIENTS +
                API_URLS.DELETE.replace("{id}", ingredientId.toString())
            )
            .then((response) => {
                setShoppingList((prevList) => {
                    if (!prevList) return prevList;
                    const updatedList = {
                        ...prevList,
                        ingredientList: prevList.ingredientList.filter(
                            (ingredient) => ingredient.id !== ingredientId
                        ),
                    };
                    return updatedList;
                });
            })
            .catch((error) => {
                console.error("Error removing from shopping list:", error);
            });
    };
    const getShoppingList = async () => {
        api
            .get(API_URLS.SHOPPINGLIST + API_URLS.LIST)
            .then((response) => {
                const shoppingListData: ShoppingListModel = response.data.data;
                setShoppingList(shoppingListData);
            })
            .catch((error) => {
                console.error("Error fetching shopping list:", error);
            });
    };

    useFocusEffect(
        useCallback(() => {
            getShoppingList();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t("shoppingList")}</Text>
            {shoppingList?.ingredientList.length === 0 ? (
                <Text style={styles.emptyMessage}>{t("shoppingListNoData")}</Text>
            ) : (
                shoppingList?.ingredientList.map(
                    (ingredient: IngredientModel, index) => (
                        <View style={styles.itemContainer} key={index}>
                            <Text style={styles.itemText}>{ingredient.name}</Text>

                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => removeFromShoppingList(ingredient.id)}
                            >
                                <Text style={styles.deleteText}>Sil</Text>
                            </TouchableOpacity>
                        </View>
                    )
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: "#f8f8f8",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
        textAlign: "center",
    },
    emptyMessage: {
        fontSize: 18,
        color: "#888",
        textAlign: "center",
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#fff",
        borderRadius: 5,
        elevation: 2,
    },
    itemText: {
        fontSize: 18,
        color: "#333",
    },
    deleteButton: {
        backgroundColor: "#ff4f4f",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    deleteText: {
        color: "#fff",
        fontWeight: "bold",
    },
    shareButton: {
        marginTop: 20,
        backgroundColor: "#4CAF50",
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    shareText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
});

export default ShoppingListPage;
