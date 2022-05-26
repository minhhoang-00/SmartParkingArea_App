import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import Svg from 'react-native-svg';
import { Circle } from 'react-native-svg';
import Pie from 'react-native-pie';
const { width, height } = Dimensions.get('window');

const adminDartBoartAnimation = require('../Assets/animation/72157-cms-content-management-system.json')
const icon_logout = require('../Assets/images/logout_icon.png')
const icon_addNewPlace = require('../Assets/images/addNewPlaceIcon.png')

const AdminPanel = ({ navigation }) => {

    const [data, setData] = useState([
        { id: 1, title1: 'Aeon Mall', status1: true, numberOfCar1: 25, title2: 'Imperial Place Apartment', status2: true, numberOfCar2: 45 },
    ]);

    const randomColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0');
        return `#${randomColor}`;
    };

    return (
        <View style={styles.contain}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Admin Panel</Text>
            </View>
            <TouchableOpacity
                onPress={() => { navigation.navigate('SystemInforPanel') }}
                style={styles.dartboardSystem}>
                <LottieView
                    source={adminDartBoartAnimation}
                    style={{ width: '85%', marginTop: height * 0.4 / 100 }}
                    autoPlay loop />
            </TouchableOpacity>
            <ScrollView style={{ width: width * 80 / 100, marginTop: height * 4 / 100 }}>
                <View style={styles.flatlit}>
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.viewFlatlist}>
                                <TouchableOpacity style={styles.viewItem}>
                                    <View style={styles.headerItem}>
                                        <Text style={styles.textHeaderItem1}>{item.title1.length > 9 ? item.title1.slice(0, 5) + "..." : item.title1}</Text>
                                        <Text style={styles.textHeaderItem2}>Status </Text>
                                        <Svg height="18" width="17" style={{ marginTop: height * 0.5 / 100 }}>
                                            <Circle cx="7" cy="7" r="7" fill={item.status1 ? '#0DD76C' : '#FF4052'} />
                                        </Svg>
                                    </View>
                                    <View style={styles.bodyItem}>
                                        <Pie
                                            radius={40}
                                            innerRadius={35}
                                            sections={[
                                                {
                                                    percentage: item.numberOfCar1,
                                                    color: randomColor(),
                                                },
                                            ]}
                                            backgroundColor="#ddd"
                                        />
                                        <Text style={styles.textChar}>{item.numberOfCar1 / 50 * 100 + "%"}</Text>
                                        <Text style={{ fontSize: 13, fontFamily: 'Ubuntu-Bold', color: '#111', marginTop: height * 4 / 100 }}>Number Of Car</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.viewItem}>
                                    <View style={styles.headerItem}>
                                        <Text style={styles.textHeaderItem1}>{item.title2.length > 5 ? item.title2.slice(0, 9) + "..." : item.title2}</Text>
                                        <Text style={styles.textHeaderItem2}>Status </Text>
                                        <Svg height="18" width="17" style={{ marginTop: height * 0.5 / 100 }}>
                                            <Circle cx="7" cy="7" r="7" fill={item.status2 ? '#0DD76C' : '#FF4052'} />
                                        </Svg>
                                    </View>
                                    <View style={styles.bodyItem}>
                                        <Pie
                                            radius={40}
                                            innerRadius={35}
                                            sections={[
                                                {
                                                    percentage: item.numberOfCar2,
                                                    color: randomColor(),
                                                },
                                            ]}
                                            backgroundColor="#ddd"
                                        />
                                        <Text style={styles.textChar}>{item.numberOfCar2 / 50 * 100 + "%"}</Text>
                                        <Text style={{ fontSize: 13, fontFamily: 'Ubuntu-Bold', color: '#111', marginTop: height * 4 / 100 }}>Number Of Car</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
            <View style={styles.button}>
                <TouchableOpacity style={styles.logoutButton}>
                    <Image
                        source={icon_logout}
                        style={styles.imageIconLogout} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton}>
                    <Image
                        source={icon_addNewPlace}
                        style={styles.imageIconAddNewPlace} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        width: width * 90 / 100,
        height: height * 10 / 100,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#111',
    },
    textHeader: {
        fontSize: 25,
        color: '#111',
        fontFamily: 'Ubuntu-Bold',
    },
    dartboardSystem: {
        width: width * 80 / 100,
        height: height * 25 / 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: height * 3 / 100,
        elevation: 15,
        backgroundColor: '#fff',
    },
    flatlit: {
        width: width * 90 / 100,
        height: height * 70 / 100,
    },
    viewFlatlist: {
        width: width * 80 / 100,
        height: height * 20 / 100,
        //backgroundColor: '#111',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    viewItem: {
        width: width * 36.5 / 100,
        height: height * 18 / 100,
        marginHorizontal: width * 2.5 / 100,
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 10,
        alignSelf: 'center'
    },
    headerItem: {
        width: width * 36.5 / 100,
        height: height * 3 / 100,
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor: '#111',
        justifyContent: 'center',
        marginTop: height * 0.85 / 100,
    },
    bodyItem: {
        width: width * 36.5 / 100,
        height: height * 13 / 100,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#111',
    },
    textChar: {
        fontSize: 20,
        color: '#111',
        fontFamily: 'Ubuntu-Bold',
        marginTop: height * -6.5 / 100,
    },
    textHeaderItem1: {
        fontSize: 13,
        color: '#111',
        fontFamily: 'Ubuntu-Bold',
        marginRight: width * 3 / 100

    },
    textHeaderItem2: {
        fontSize: 10,
        color: '#111',
        fontFamily: 'Ubuntu-Bold',

    },
    button: {
        width: width * 80 / 100,
        height: height * 10 / 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    imageIconLogout: {
        width: width * 12 / 100,
        height: height * 7 / 100,
        resizeMode: 'cover',
        marginHorizontal: width * 25 / 100,
    },
    imageIconAddNewPlace: {
        width: width * 13 / 100,
        height: height * 6.5 / 100,
        resizeMode: 'cover',
        marginHorizontal: width * 25 / 100,
        marginTop: height * -1.5 / 100,
    },
})

export default AdminPanel;