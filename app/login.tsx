import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { H3, H5, YStack, Button, Input } from 'tamagui'
import { Link } from 'expo-router'
import { t } from 'i18next'

const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const onClickButton = () => {
        // Handle button click logic here
        console.log("Button clicked!", email, password)
    }

    return (
        <View style={styles.container}>
            <H3 style={styles.title}>{t("TODO: login")}</H3>
            <H5 style={styles.subtitle}>{t("TODO: please login")}</H5>
            <Input
                size={'$4'}
                width="$12"
                placeholder={t('email')}
                my="$4"

                onChangeText={(text) => setEmail(text)}
            />
            <Input
                size={'$4'}
                width="$12"
                placeholder={t('password')}

                onChangeText={(text) => setPassword(text)}
            />
            <Button
                onPress={onClickButton}
                size="$4"
                theme="red"
                width="$12"
                my="$4"
                fontWeight="bold"
            >
                {t("login")}
            </Button>

            <Link href="/settings" style={{ marginTop: 20 }}>
                {t("settings")}
            </Link>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 150,
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
    },
})