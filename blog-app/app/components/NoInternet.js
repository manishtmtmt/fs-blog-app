import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

const NoInternet = ({ onRefreshPress }) => {
    return (
        <View style={styles.container}>
            <Feather name="wifi-off" size={35} color="#383838" />
            <Text style={{ fontSize: 18, color: '#383838', paddingVertical: 5 }}>
                No Internet Connection
            </Text>
            <Pressable onPress={onRefreshPress} style={{ flexDirection: 'row', alignItems: "center" }}>
                <Feather name='refresh-cw' size={18} color="black" />
                <Text style={{ fontSize: 18, marginLeft: 5, paddingVertical: 5 }}>
                    Try Again
                </Text>
            </Pressable>
        </View>
    )
}

export default NoInternet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})