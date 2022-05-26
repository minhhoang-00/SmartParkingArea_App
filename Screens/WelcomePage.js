import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated, TouchableOpacity } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { Easing } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const parkingGateImage = require('../Assets/images/parkinggateclosing.png');
const car = require('../Assets/images/car.png');
const logo = require('../Assets/images/logo.jpg');

const WelcomePage = ({ navigation }) => {

    const topMotion = useRef(new Animated.Value(0)).current;
    const Start = () => {
        setTimeout(() => {
            Animated.timing(topMotion, {
                toValue: 200,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.back(1.5),
            }).start();

        }, 100);
        setTimeout(() => {
            navigation.navigate('SignIn');
        }, 2500);
    }

    return (
        <View style={styles.contain}>

            <View style={{ width: width * 70 / 100, height: height * 25 / 100, marginBottom: height * 27 / 100, marginLeft: width * -8 / 100, }}>
                <Image
                    source={logo}
                    style={styles.ImageStyle1}
                />
            </View>
            <Animated.Image
                source={car}
                style={{ marginLeft: topMotion, height: height * 10 / 100, width: width * 44 / 100, justifyContent: 'center', alignItems: 'center', marginBottom: height * -26 / 100, marginRight: width * 35 / 100, }}>
            </Animated.Image>
            <View style={styles.parkingGateAndLine}>
                <Svg height="10" width="300" style={{ marginTop: height * 31 / 100 }}>
                    <Polyline
                        points="10,10 480, 10"
                        fill="none"
                        stroke="black"
                        strokeWidth="10"
                    />
                </Svg>
                <Image
                    source={parkingGateImage}
                    style={styles.parkingGateImage}
                />
            </View>
            <TouchableOpacity
                style={styles.viewButton}
                onPress={Start}>
                <Text style={styles.textButton}>Get Started</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
    viewCarImage: {
        width: width * 10 / 100,
        height: height * 10 / 100,
        //backgroundColor: '#111',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: height * 0 / 100,
        marginLeft: width * -20 / 100,
    },
    carImage: {
        width: width * 39 / 100,
        height: height * 9 / 100,
    },
    parkingGateAndLine: {
        width: '100%',
        height: height * 20 / 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        color: '#111',
    },
    parkingGateImage: {
        width: width * 15 / 100,
        height: height * 31 / 100,
        marginLeft: width * -5 / 100,
    },
    image: {
        width: width * 10 / 100,
        height: height * 21 / 100,
    },
    textheader: {
        fontSize: 30,
        color: '#111',
        fontWeight: 'bold',
    },
    ImageStyle1: {
        width: width * 80 / 100,
        height: height * 19 / 100,
        resizeMode: 'contain',
    },
    viewButton: {
        width: width * 60 / 100,
        height: height * 7 / 100,
        backgroundColor: '#111',
        marginTop: height * 20 / 100,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        fontSize: 20,
        color: '#ffffff',

    }
})

export default WelcomePage;