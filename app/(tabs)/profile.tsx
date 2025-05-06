import api from '@/api';
import API_URLS from '@/constants/apiUrls';
import { UserModel } from '@/models/UserModel';
import { useFocusEffect } from 'expo-router';
import { t } from 'i18next';
import React, { useCallback, } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, H3, XStack } from 'tamagui';
import useUserStore from '../stores/userStore';


const ProfilePage = () => {
    const { user, logout, userToken, setUser } = useUserStore();
    const handleLogout = () => {
        Alert.alert("Çıkış Yap", "Emin misin?", [
            { text: "İptal", style: "cancel" },
            { text: "Evet", onPress: logout }
        ]);
    };
    const getUserInfo = async () => {
        api.get(API_URLS.USERINFO, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            }
        }).then((response) => {
            const userData: UserModel = response.data.data;
            setUser(userData);
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


