import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Svg from 'react-native-svg';
import { Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const animationImage = require('../Assets/animation/66374-lottie-admin.json');

const WelcomePageAdmin = ({ navigation }) => {

    const onPress = () => {
        navigation.navigate('AdminPanel');
    }

    return (
        <View style={styles.contain}>
            <View style={styles.infor}>
                <Text style={styles.textInfor}>Welcome to Admin Page</Text>
                <Text style={styles.textInforsmall}>Control The Parking Area System</Text>
                <Text style={styles.textInforsmall}>Monitoring More System Parameter</Text>
            </View>
            <View style={styles.svgCycle}>
                <Svg width={width * 85 / 100} height={height * 55 / 100} style={{ marginTop: height * 4.5 / 100, marginLeft: width * 22 / 100 }}>
                    <Circle cx="10" cy="223.5" r="220" fill="#fff" stroke="#E6E9F0" strokeWidth="12" />
                    <LottieView
                        source={animationImage}
                        style={{ width: '85%', marginTop: height * 5.2 / 100, marginLeft: width * -13.5 / 100}}
                        autoPlay loop />
                </Svg>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                onPress={onPress}
                style={{justifyContent: 'center', alignItems: 'center', paddingTop: height * 6 / 100}}
                >
                    <View style={styles.viewButton}>
                        <Text style={styles.textButton}>Let's get stated</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    textInfor: {
        fontSize: 27,
        color: '#111',
        fontWeight: 'bold',
        marginBottom: height * 2 / 100,
        fontFamily: 'Ubuntu-Bold',
    },
    textInforsmall: {
        fontSize: 17,
        color: '#c0c4ce',
        fontFamily: 'Ubuntu-Medium',
    },
    infor: {
        width: width * 100 / 100,
        height: height * 20 / 100,
        paddingLeft: width * 7 / 100,
        paddingTop: height * 7 / 100,
    },
    svgCycle: {
        width: width * 100 / 100,
        height: height * 60 / 100,
        justifyContent: 'center',
    },
    button: {
        width: width * 100 / 100,
        height: height * 20 / 100,
    },
    viewButton: {
        width: width * 50 / 100,
        height: height * 7 / 100,
        backgroundColor: '#333841',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    textButton: {
        fontSize: 17,
        color: '#fff',
        fontFamily: 'Ubuntu-Regular',
    },
});

export default WelcomePageAdmin;