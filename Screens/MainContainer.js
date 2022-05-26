import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from "./Home";
import User from "./User";
import Map from "./Map";

const homeName = 'Home';
const userName = 'User';
const mapName = 'Map';

const { width, height } = Dimensions.get('window');
const sizeofIcon = (width + height) / 2;
const sizeIcon = sizeofIcon * 5 / 100;
const sizeIconFocusHome = sizeofIcon * 8 / 100;
const sizeIconFocus = sizeofIcon * 6.5 / 100;

const Tab = createBottomTabNavigator();

const MainContainer = () => {
    
    return (
        <Tab.Navigator
            initialRouteName={homeName}
            sceneContainerStyle={{ backgroundColor: '#fff' }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline';
                        size = focused ? sizeIconFocusHome : sizeIcon ;
                    } else if (rn === userName) {
                        iconName = focused ? 'man' : 'man-outline';
                        size = focused ? sizeIconFocus : sizeIcon;
                    } else if (rn == mapName) {
                        iconName = focused ? 'map' : 'map-outline';
                        size = focused ? sizeIconFocus : sizeIcon;
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarHideOnKeyboard: 'true',
                tabBarLabelStyle: { fontSize: 0 },
                tabBarStyle: {height: height * 8 / 100,}
            })
            }
            tabBarOptions={{
                activeTintColor: '#2FBBF0',
                inactiveTintColor: '#7A8FA6',
            }}
        >
            <Tab.Screen name={mapName} component={Map} options={{ headerShown: false }} />
            <Tab.Screen name={homeName} component={Home} options={{ headerShown: false }} />
            <Tab.Screen name={userName} component={User} options={{ headerShown: false }} />

        </Tab.Navigator>

    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#111',
    },
})

export default MainContainer;