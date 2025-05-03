import { Input, ScrollView, View, XStack, Text, debounce } from "tamagui";
import React, { useState, useCallback, use, useEffect } from "react";
import { CardComponent } from "../components/CardComponent";
import useMealStore from "../stores/mealStore";
import { t } from "i18next";
import axios, { AxiosResponse } from "axios";
import API_URLS from "@/constants/apiUrls";
import { useFocusEffect } from "expo-router";
import { BaseModel } from "@/models/BaseModel";
import { MealModel } from "@/models/MealModel";
const MealListPage = () => {
    const [mealList, setMealList] = useState<MealModel[]>([]);
    const [searchText, setSearchText] = useState("");

    const handleInputChange = useCallback(
        debounce((text: string) => {
            setSearchText(text);
        }, 500),
        []
    );

    //TODO: use api to filter meal list
    const filteredMeals = mealList.filter((meal) =>
        meal.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const getMealList = () => {
        axios.get(API_URLS.BASE_URL + API_URLS.MEAL + API_URLS.LIST)
            .then(response => {
                const data: BaseModel<MealModel[]> = response.data;
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