import { Input, ScrollView, View, XStack, Text, debounce } from "tamagui";
import React, { useState, useCallback } from "react";
import { CardComponent } from "../components/CardComponent";
import useMealStore from "../stores/mealStore";
import { t } from "i18next";

const MealListPage = () => {
    const { mealList } = useMealStore();
    const [searchText, setSearchText] = useState("");

    const handleInputChange = useCallback(
        debounce((text: string) => {
            setSearchText(text);
        }, 500),
        []
    );

    const filteredMeals = mealList.filter((meal) =>
        meal.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <XStack alignItems="center" width={'100%'} paddingHorizontal={15} marginTop={40}>
                <Text fontSize={30} fontWeight={'bold'} color={'$color'}>{t('mealList')}</Text>
            </XStack>
            <XStack alignItems="center" width={'100%'} paddingHorizontal={15} marginTop={20} marginBottom={20}>
                <Input
                    flex={1}
                    size={'$4'}
                    placeholder={t('mealSearchPlaceholder')}
                    onChangeText={(text) => handleInputChange(text)}
                />
            </XStack>
            <ScrollView showsVerticalScrollIndicator={false}>
                <CardComponent list={filteredMeals}></CardComponent>
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
        padding: 20,
    },
};