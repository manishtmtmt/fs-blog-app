import React from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import Home from '../components/Home';
import PostDetail from '../components/PostDetail';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

    const navigation = useNavigation()

    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} component={Home} name="Home" />
            <Stack.Screen options={{
                title: "", headerTransparent: true, headerShadowVisible: false, headerLeft: (props) => {
                    return <TouchableNativeFeedback { ...props } onPress={navigation.goBack} >
                        <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </View>
                    </TouchableNativeFeedback>
                }
            }} component={PostDetail} name="PostDetail" />
        </Stack.Navigator>
    )
}

export default AppNavigator