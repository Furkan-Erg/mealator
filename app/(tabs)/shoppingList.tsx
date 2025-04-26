import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import useMealStore from "../stores/mealStore";
import { t } from "i18next";

const ShoppingListPage = () => {
    const { shoppingList, removeFromShoppingList } = useMealStore();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t("shoppingList")}</Text>
            {shoppingList.length === 0 ? (
                <Text style={styles.emptyMessage}>{t("shoppingListNoData")}</Text>
            ) : (
                shoppingList.map((item, index) => (
                    <View style={styles.itemContainer} key={index}>
                        <Text style={styles.itemText}>{item}</Text>

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => removeFromShoppingList(item)}
                        >
                            <Text style={styles.deleteText}>Sil</Text>
                        </TouchableOpacity>
                    </View>
                ))
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
});

export default ShoppingListPage;
