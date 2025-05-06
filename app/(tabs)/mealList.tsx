import { Input, ScrollView, View, XStack, Text, debounce } from "tamagui";
import React, { useState, useCallback, use, useEffect } from "react";
import { CardComponent } from "../components/CardComponent";
import { t } from "i18next";
import API_URLS from "@/constants/apiUrls";
import { useFocusEffect } from "expo-router";
import { BaseResponse } from "@/models/BaseResponse";
import { MealModel } from "@/models/MealModel";
import api from "@/api";
import useMealStore from "../stores/mealStore";
const MealListPage = () => {
    const { favoriteMealList, removeFavoriteMeal, addFavoriteMeal } = useMealStore();

    const [mealList, setMealList] = useState<MealModel[]>([]);
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

    const getMealList = () => {
        api.get(API_URLS.MEAL + API_URLS.LIST)
            .then(response => {
                const data: BaseResponse<MealModel[]> = response.data;
                if (data.success) {
                    setMealList(data.data);
                } else {
                    console.error("Error fetching meal list:", data.errorMessage);
                }
            })
            .catch(error => {
                console.error("Error fetching meal list:", error);
            });
    };
    const toggleFavoriteItem = (meal: MealModel) => {
        api.post(API_URLS.MEAL + API_URLS.FAVORITE.replace("{id}", meal.id.toString()))
            .then((response) => {
                useMealStore.getState().favoriteMealList.includes(meal) ? removeFavoriteMeal(meal.id) : addFavoriteMeal(meal);
            })
            .catch((error) => {
                console.error("Error adding to favorites:", error);
            }
            );
    }

    useFocusEffect(
        useCallback(() => {
            getMealList();
        }
            , [])
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
                <CardComponent list={filteredMeals} toggleFavoriteItem={toggleFavoriteItem}></CardComponent>
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