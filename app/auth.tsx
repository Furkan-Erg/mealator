import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import LoginPage from './components/AuthComponents/login'
import RegisterPage from './components/AuthComponents/register'
import { PageType } from './enums/PageType'





const AuthPage = () => {
    const [currentPage, setCurrentPage] = React.useState<PageType>(PageType.LOGIN);
    const changePage = (page: PageType) => {
        setCurrentPage(page);
    }
    return (
        <View style={styles.container}>
            {currentPage === PageType.LOGIN ? (
                <LoginPage changePage={changePage} />
            ) : (
                <RegisterPage changePage={changePage} />
            )}
        </View>
    )
}

export default AuthPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
    }
})