import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView, Image, TextInput, FlatList, TouchableOpacity, Dimensions, ActivityIndicator, Alert, RefreshControl } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import LottieView from 'lottie-react-native';

const logo = require("../Assets/images/logo.jpg");
const headerAnimation = require('../Assets/animation/93387-car-insurance-offers-loading-page.json');
const mapAnimation = require('../Assets/animation/66748-mapa.json')
const nameIcon = 'search-outline';
const sizeIcon = 20;
const colorIcon = '#bcbabc';
const nameIconText = 'doubleright';
const sizeIconText = 18;
const colorIconText = '#fff';
const { width, height } = Dimensions.get('window');

const Home = ({ navigation }) => {

    useEffect(() => {
        checkScreen();
        if (changeScreen == true) {
            getparkingAreaBookingValue();
        }
        getSizedata();
        checkSearch();
        getLiencesePlate();
        if (checkLiencesePlateUpdate == false) {
            setLicensePlates();
        }
        console.log("check useEffect");
    });

    const [search, setSearch] = useState("");
    const [data, setData] = useState(new Array());
    const [isLoading, setIsLoading] = useState(false);
    const [sizeData, setSizeData] = useState(0);
    const [isSearch, SetIsSearch] = useState(false);
    const [dataSearch, setDataSearch] = useState(new Array());
    const [emailUserPresent, setEmailUserPresent] = useState();
    const [checkLiencesePlateUpdate, setCheckLiencesePlateUpdate] = useState(false);
    const [LicensePlatesForBooking, setLicensePlatesForBooking] = useState();
    const [changeScreen, setChangeScreen] = useState(false);
    const [parkingAreaBookingValue, setParkingAreaBookingValue] = useState();

    const checkScreen = () => {
        var LiencesePlateCheck = '';
        firestore()
            .collection('Users')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().Email == emailUserPresent) {
                        LiencesePlateCheck = documentSnapshot.data().LicensePlates;
                    }
                })
            })
        firestore()
            .collection('ParkingArea')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if (doc.data().LicensePlatesBooking.includes(LiencesePlateCheck)) {
                        setChangeScreen(true);
                        sendChangeScreenValue();
                    }
                })
            })
    }

    const sendChangeScreenValue = () => {
        database()
        .ref('changeScreen')
        .update({
            changeScreenValue: changeScreen
        })
    }

    const getparkingAreaBookingValue = () => {
        database()
        .ref('parkingAreaBooking')
        .on('value', (snapshot) => {
            setParkingAreaBookingValue(snapshot.val().parkingAreaBookingValue);
        })
    }

    const BookNow = (name, LicensePlatesBooking) => {
        database()
        .ref('parkingAreaBooking')
        .update({
            parkingAreaBookingValue: name,
        })
        Alert.alert(`Booking Parking Area`, `Are you sure you want to book ${name} parking area?`, [
            {text: 'Cancel', onPress: () => null, style: 'cancel'},
            {
                text: 'Yes', onPress: () => {
                    firestore()
                        .collection('ParkingArea')
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc => {
                                if (doc.data().Name == name) {
                                    firestore()
                                        .collection('ParkingArea')
                                        .doc(doc.id)
                                        .update({
                                            LicensePlatesBooking: firestore.FieldValue.arrayUnion(LicensePlatesForBooking),
                                            NumberOfBooking: LicensePlatesBooking.length + 1,
                                        })
                                        .then(() => {
                                            Alert.alert('Success', `You have booked in ${name} parking area`, [
                                                {
                                                    text: 'Cancel', onPress: () => {
                                                        navigation.navigate('Home');
                                                        setChangeScreen(true);
                                                        sendChangeScreenValue();
                                                    }, style: 'cancel'
                                                },
                                                {
                                                    text: 'go to map', onPress: () => {
                                                        navigation.navigate('Map');
                                                        setChangeScreen(true);
                                                        sendChangeScreenValue();
                                                    }
                                                },
                                            ]);
                                        })
                                }
                            })
                        })
                }
            },
        ])
    }

    const getData = () => {
        const newData = new Array();
        firestore()
            .collection('ParkingArea')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    newData.push({
                        id: documentSnapshot.id,
                        name: documentSnapshot.data().Name,
                        URLimage: documentSnapshot.data().URLimage,
                        Latitude: documentSnapshot.data().Latitude,
                        Longitude: documentSnapshot.data().Longitude,
                        TotalSpace: documentSnapshot.data().TotalSpace,
                        NumberOfBooking: documentSnapshot.data().NumberOfBooking,
                        LicensePlatesBooking: documentSnapshot.data().LicensePlatesBooking,
                    });
                    setData(newData);
                });
            });
    }

    const setLicensePlates = () => {
        database()
            .ref('emailPresent')
            .on('value', snapshot => {
                setEmailUserPresent(snapshot.val().email);
                getEmailNotification();
            });
    }

    const getLiencesePlate = () => {
        firestore()
            .collection('Users')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().Email == emailUserPresent) {
                        setLicensePlatesForBooking(documentSnapshot.data().LicensePlates);
                    }
                })
            })
    }

    const getEmailNotification = () => {
        firestore()
            .collection('Users')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().Email == emailUserPresent) {
                        if (documentSnapshot.data().LicensePlates == '') {
                            setCheckLiencesePlateUpdate(true);
                            sentnotification();
                        }
                    }
                });
            })
    }

    const sentnotification = () => {
        Alert.alert(`Your License Plate is Empty`, `Please fill your license plate`, [
            { text: 'Later', onPress: () => null },
            { text: 'OK', onPress: () => navigation.navigate('User') }
        ],
            { cancelable: false }
        );
    }

    const getSizedata = () => {
        firestore()
            .collection('Users')
            .get()
            .then(querySnapshot => {
                if (querySnapshot.size != sizeData) {
                    setIsLoading(true);
                    getData();
                    setSizeData(querySnapshot.size);
                    setIsLoading(false);
                }
            });
    }

    const cancelBooking = () => {
        Alert.alert(`Cancel Booking`, `Are you sure to cancel booking?`, [
            { text: 'No', onPress: () => null },
            {
                text: 'Yes', onPress: () => {
                    firestore()
                        .collection('ParkingArea')
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc => {
                                if (doc.data().LicensePlatesBooking.includes(LicensePlatesForBooking)) {
                                    console.log(doc.data().Name);
                                    console.log(doc.id);
                                    firestore()
                                        .collection('ParkingArea')
                                        .doc(doc.id)
                                        .update({
                                            LicensePlatesBooking: firestore.FieldValue.arrayRemove(LicensePlatesForBooking),
                                            NumberOfBooking: doc.data().NumberOfBooking - 1,
                                        })
                                        .then(() => {
                                            navigation.navigate('Home');
                                            console.log('Success Delete License Plate');
                                            setChangeScreen(false);
                                            sendChangeScreenValue();
                                        })
                                }
                            })
                        })
                }
            },
        ])
    }

    const Search = () => {
        var check = false;
        data.forEach(element => {
            if (element.name.toLowerCase().includes(search.toLowerCase())) {
                setDataSearch(element);
                SetIsSearch(true);
                check = true;
                setSearch("");
            }
        })
        if (check == false) {
            setSearch("");
            alert('Not Found');
        }
    }

    const checkSearch = () => {
        if (search == "") {
            SetIsSearch(false);
        }
    }

    return (
        <View style={styles.mainView}>
            <StatusBar
                backgroundColor='#fff'
                barStyle='dark-content' />
            {
                changeScreen ? (
                    <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                        <StatusBar
                            backgroundColor='#fff'
                            barStyle='dark-content' />
                        <View style={styles.Heading1}>
                            <Image
                                source={logo}
                                style={styles.ImageStyle1}
                            />
                            <Text style={styles.NotificationText}>You Are Booked Parking Area</Text>
                            <Text style={styles.NotificationText}>Please Hurry To The {parkingAreaBookingValue}</Text>
                            <LottieView
                                source={headerAnimation}
                                style={styles.animationHear}
                                autoPlay loop />
                        </View>
                        <View style={styles.bottomView}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Map')}>
                                <View style={styles.buttonView11}>
                                    <View style={styles.buttonViewInside11}>
                                        <LottieView
                                            source={mapAnimation}
                                            style={{ width: '170%', marginTop: height * 1.1 / 100, }}
                                            autoPlay loop />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => cancelBooking()}>
                                <View style={styles.buttonView12}>
                                    <View style={styles.buttonViewInside12}>
                                        <Text style={{ color: '#fff', fontSize: 65, fontWeight: 'bold' }}>X</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                ) : (
                    <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                        <StatusBar
                            backgroundColor='#fff'
                            barStyle='dark-content' />
                        <View style={styles.Heading}>
                            <Image
                                source={logo}
                                style={styles.ImageStyle1}
                            />
                        </View>
                        <View style={styles.textInputView}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Search using name parking area"
                                placeholderTextColor="#111"
                                value={search}
                                onChangeText={setSearch}
                                onSubmitEditing={Search}
                            />
                            <Ionicons name={nameIcon} size={sizeIcon} color={colorIcon} />
                        </View>
                        <ScrollView style={{ width: '90%', marginTop: '3%' }}>
                            <View style={styles.newFeed}>
                                {
                                    data.length < 1 || isLoading == true ?
                                        (
                                            <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#bcbabc" />
                                        ) :
                                        (
                                            <FlatList
                                                data={isSearch ? [dataSearch] : data}
                                                extraData={data}
                                                keyExtractor={item => item.id}
                                                renderItem={({ item, index }) => (
                                                    <View style={styles.postView}>
                                                        <Text style={styles.postHeaderText}>{item.name}</Text>
                                                        <Text style={styles.postSmallText}>{item.TotalSpace > item.NumberOfBooking ? "Empty Space" : "Full Space"}</Text>
                                                        <Image
                                                            source={{ uri: item.URLimage }}
                                                            style={styles.ImageFlatlist}>
                                                        </Image>
                                                        <View style={styles.buttonView}>
                                                            <TouchableOpacity
                                                                onPressOut={() => BookNow(item.name, item.LicensePlatesBooking)}>
                                                                <View style={styles.bookingButtonView}>
                                                                    <Text style={styles.bookingText}>Book Now</Text>
                                                                    <View style={styles.circle}>
                                                                        <AntDesign name={nameIconText} size={sizeIconText} color={colorIconText} />
                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )}
                                            />
                                        )
                                }
                            </View>
                        </ScrollView>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    Text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#111',
    },
    Heading: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
    },
    Heading1: {
        width: '100%',
        height: '30%',
        alignItems: 'center',
    },
    ImageStyle: {
        width: '75%',
        height: '90%',
        resizeMode: 'contain',
        marginLeft: '-12%',
        marginTop: '-20%',
    },
    ImageStyle1: {
        width: '75%',
        height: height * 9 / 100,
        resizeMode: 'contain',
        //marginLeft: '-12%',
        marginBottom: height * 2 / 100,
    },
    animationHear: {
        width: '100%',
    },
    bottomView: {
        width: '100%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#111'
    },
    NotificationText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonView11: {
        width: width * 35 / 100,
        height: height * 18 / 100,
        backgroundColor: '#fff',
        // elevation: 10,
        borderRadius: 15,
        // shadowRadius: 10,
        // shadowColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        //marginRight: width * 20 / 100,
        //paddingLeft: width * 1 / 100,
        marginTop: height * 10 / 100,
        backgroundColor: '#E9F3FF',
    },
    buttonViewInside11: {
        width: width * 31.5 / 100,
        height: height * 16 / 100,
        // elevation: 10,
        borderRadius: 25,
        // shadowRadius: 10,
        // shadowColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        //marginRight: width * 20 / 100,
        //paddingLeft: width * 1 / 100,
        //marginTop: height * 5 / 100,
        backgroundColor: '#fff',
    },
    buttonView12: {
        width: width * 35 / 100,
        height: height * 18 / 100,
        backgroundColor: '#fff',
        // elevation: 10,
        borderRadius: 15,
        // shadowRadius: 10,
        // shadowColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        //marginRight: width * 20 / 100,
        //paddingLeft: width * 1 / 100,
        marginTop: height * 5 / 100,
        backgroundColor: '#FFE3E4',
    },
    buttonViewInside12: {
        width: width * 28 / 100,
        height: height * 14.3 / 100,
        backgroundColor: '#fff',
        // elevation: 10,
        borderRadius: 15,
        // shadowRadius: 10,
        // shadowColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        //marginRight: width * 20 / 100,
        //paddingLeft: width * 1 / 100,
        //marginTop: height * 5 / 100,
        backgroundColor: '#FD5C5C',
    },
    textInputView: {
        width: '90%',
        flexDirection: 'row',
        backgroundColor: '#F1EFF1',
        borderRadius: 20,
        marginTop: '5%',
        paddingHorizontal: '3%',
        alignItems: 'center',
        marginBottom: '5%',
    },
    textInput: {
        marginRight: width > 400 ? width / 2.8 : width / 4.2,
    },
    newFeed: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    },
    postView: {
        width: '100%',
        flexDirection: 'column',
        marginBottom: height * 5 / 100,
    },
    ImageFlatlist: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 10,
    },
    postHeaderText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#111',
        marginLeft: width * 2 / 100,
    },
    postSmallText: {
        marginBottom: height * 1 / 100,
        marginTop: height * 0.2 / 100,
        marginLeft: width * 2.1 / 100,
        color: "#111",
        fontSize: 15,
    },
    ImageFlatlist: {
        width: width * 90 / 100,
        height: height * 30 / 100,
        resizeMode: 'contain',
        borderRadius: 5,
    },
    buttonView: {
        width: '99%',
        height: height * 6.5 / 100,
        marginTop: height * 2 / 100,
        alignItems: 'flex-end',
    },
    bookingButtonView: {
        width: width * 45 / 100,
        height: height * 6.5 / 100,
        backgroundColor: '#E92E55',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    bookingText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: width * 4 / 100,
    },
    circle: {
        width: width * 9 / 100,
        height: width * 9 / 100,
        borderRadius: width * 10 / 100,
        borderColor: '#fff',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: width * 3 / 100,
        color: '#fff',
        fontWeight: 'bold',
    }
})

export default Home;