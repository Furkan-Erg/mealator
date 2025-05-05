import { View, StyleSheet, Alert } from 'react-native';
import React, { useCallback, } from 'react';
import { H3, H5, Button, XStack } from 'tamagui';
import useUserStore from '../stores/userStore';
import { t } from 'i18next';
import axios from 'axios';
import API_URLS from '@/constants/apiUrls';
import { useFocusEffect } from 'expo-router';
import { UserModel } from '@/models/UserModel';


const ProfilePage = () => {
    const { user, logout, userToken, setUser } = useUserStore();
    const handleLogout = () => {
        Alert.alert("Çıkış Yap", "Emin misin?", [
            { text: "İptal", style: "cancel" },
            { text: "Evet", onPress: logout }
        ]);
    };
    const getUserInfo = async () => {
        axios.get(API_URLS.BASE_URL + API_URLS.USERINFO, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            }
        }).then((response) => {
            const userData: UserModel = response.data.data;
            setUser(userData);
            console.log("User Data:", userData);
        });

    }

    useFocusEffect(
        useCallback(() => {
            if (user) return;
            getUserInfo();
        }
            , [userToken,])
    )


    return (
        <View style={styles.container}>
            <XStack style={{ display: "flex", gap: 10, }}>
                <H3 style={styles.name}>{user?.name}</H3>
                <H3 style={styles.name}>{user?.surname}</H3>
            </XStack >
            <Button
                size="$4"
                theme="red"
                width="$10"
                onPress={handleLogout}
            >
                {t('logout')}
            </Button>
        </View >
    );
};

export default ProfilePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    name: {
        marginTop: 12,
        fontWeight: 'bold',
        color: '#222',
    },
});


