import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { H3, H5, Input, Button, XStack, Paragraph } from "tamagui";
import { t } from "i18next";
import axios from "axios";
import API_URLS from "@/constants/apiUrls";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BaseResponse } from "@/models/BaseResponse";
import useUserStore from "../../stores/userStore";
import { PageType } from "@/app/enums/PageType";

const LoginPage = ({ changePage }: { changePage: Function }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { setUserToken } = useUserStore();

    const login = async () => {
        const requestBody = { username, password };

        try {
            const response = await axios.post(
                API_URLS.BASE_URL + API_URLS.LOGIN,
                requestBody
            );
            const responseData: BaseResponse<{ token: string }> = response.data;
            if (responseData.success) {
                setUserToken(responseData.data.token);
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <View style={styles.container}>
            <H3 style={styles.title}>{t("login")}</H3>
            <H5 style={styles.subtitle}>{t("please_login")}</H5>

            <Input
                size="$4"
                width="$12"
                placeholder={t("username")}
                my="$4"
                onChangeText={setUsername}
                value={username}
            />

            <XStack>
                <Input
                    size="$4"
                    width="$12"
                    placeholder={t("password")}
                    secureTextEntry={!showPassword}
                    onChangeText={setPassword}
                    value={password}
                />
                <Ionicons
                    style={styles.eyeIcon}
                    size={24}
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    onPress={() => setShowPassword(!showPassword)}
                />
            </XStack>

            <Button
                onPress={login}
                size="$4"
                theme="red"
                width="$12"
                my="$4"
                fontWeight="bold"
            >
                {t("login")}
            </Button>

            <XStack style={{ display: 'flex', gap: 10, alignItems: "center" }}>
                <Paragraph>{t("no_account_question")}</Paragraph>
                <Paragraph style={styles.link} onPress={() => changePage(PageType.REGISTER)}>
                    {t("register")}
                </Paragraph>
            </XStack>
        </View>
    );
};

export default LoginPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
    },
    title: {
        fontWeight: "bold",
        color: "#333",
    },
    subtitle: {
        color: "#666",
        marginTop: 8,
        marginBottom: 16,
    },
    eyeIcon: {
        marginLeft: -24,
        left: -10,
        alignSelf: "center",
        position: "relative",
    },
    link: {
        color: "#007bff",
    },
});
