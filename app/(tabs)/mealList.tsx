import { ScrollView, View, XStack } from "tamagui";
import React from "react";
import { CardComponent } from "../components/CardComponent";
import useMealStore from "../stores/mealStore";

const MealListPage = () => {
    const { mealList } = useMealStore();

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <CardComponent list={mealList}></CardComponent>
            </ScrollView>
        </View>

    );
};

export default MealListPage;
const styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },

};
