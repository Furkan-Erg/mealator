import api from "@/api";
import { PageType } from "@/app/enums/PageType";
import useUserStore from "@/app/stores/userStore";
import API_URLS from "@/constants/apiUrls";
import { BaseResponse } from "@/models/BaseResponse";
import { t } from "i18next";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, H3, H5, Input, Paragraph } from "tamagui";

const RegisterPage = ({ changePage }: { changePage: Function }) => {
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const { setUserToken } = useUserStore();
    const register = async () => {
        const requestBody = {
            name: name,
            surname: surname,
            username: username,
            password: password,
        };

        await api.post(API_URLS.REGISTER, requestBody).then((response) => {
            const responseData: BaseResponse<string> = response.data;
            if (responseData.success) {
                setUserToken(responseData.data);
            }

        }).catch((error => {
            console.error("Kayıt başarısız:", error);
        }
        ));
    };

    return (
        <View style={styles.container}>
            <H3 style={styles.title}>{t("register")}</H3>
            <H5 style={styles.subtitle}>{t("please_register")}</H5>

            <Input
                size="$4"
                width="$12"
                placeholder={t("name")}
                my="$2"
                onChangeText={(text) => setName(text)}
            />
            <Input
                size="$4"
                width="$12"
                placeholder={t("surname")}
                my="$2"
                onChangeText={(text) => setSurname(text)}
            />
            <Input
                size="$4"
                width="$12"
                placeholder={t("username")}
                my="$2"
                onChangeText={(text) => setUsername(text)}
            />
            <Input
                size="$4"
                width="$12"
                placeholder={t("password")}
                secureTextEntry
                my="$2"
                onChangeText={(text) => setPassword(text)}
            />

            <Button onPress={register} size="$4" theme="green" width="$12" my="$4">
                {t("register")}
            </Button>
            <Paragraph style={styles.link} onPress={() => changePage(PageType.LOGIN)}>
                {t("already_have_account")}
            </Paragraph>
        </View>
    );
};

export default RegisterPage;

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
        marginBottom: 16,
    },
    link: {
        color: "#007bff",
    },
});
