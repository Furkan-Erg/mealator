import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { H1, XStack, YStack } from 'tamagui'
import { t } from 'i18next'

const Profile = () => {
    return (
        <View style={styles.container}>
            <YStack space="$4" style={styles.header}>
                <H1 style={styles.title}>{t('profile')}</H1>
                < Text style={styles.subtitle} > {('profile info TODO: ')}</Text>
                <Text style={styles.subtitle}>{t('name')}: John Doe</Text>
            </YStack>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
    },
    header: {
        marginBottom: 20,
    },
})
