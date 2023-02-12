import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo'
import TabNavigator from './app/navigation/TabNavigator';
import NoInternet from './app/components/NoInternet';

const CUSTOM_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff'
  }
}

const App = () => {
  const [noInternet, setNoInternet] = useState(false);
  const netinfo = useNetInfo();

  const fetchNetInfo = () => {
    const { isConnected, isInternetReachable } = netinfo;
    if(isConnected === false && isInternetReachable === false) setNoInternet(true);
    setNoInternet(false)
  }

  useEffect(() => {
    fetchNetInfo();
  }, [netinfo])

  if(noInternet) return <NoInternet onRefreshPress={fetchNetInfo} />
  return (
    <NavigationContainer theme={CUSTOM_THEME}>
      <TabNavigator />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})