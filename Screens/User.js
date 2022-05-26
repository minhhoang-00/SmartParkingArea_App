import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Dimensions, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Modal, Image, Alert, Platform } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import LottieView from 'lottie-react-native';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

const editAnimation = require('../Assets/animation/77380-edit.json');
const signOutAnimation = require('../Assets/animation/68582-log-out.json');
const saveAnimation = require('../Assets/animation/8569-file-save.json');


const User = ({ navigation, route }) => {

    useEffect(() => {
        if (editable == false) {
            getEmail();
        }

    });

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [LicensePlates, setLicensePlates] = useState('please update');
    const [PhoneNumber, setPhoneNumber] = useState();
    const [editable, SetEditable] = useState(false);
    const [document, setDocument] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [imageUser, setImageUser] = useState();
    const [imageUserUpdate, setImageUserUpdate] = useState();
    const [urlImage, setUrlImage] = useState();

    const getEmail = () => {
        database()
            .ref('emailPresent')
            .on('value', snapshot => {
                setEmail(snapshot.val().email);
                getAllData();
            });
    }

    const getAllData = () => {
        firestore()
            .collection('Users')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().Email == email) {
                        setDocument(documentSnapshot.id);
                        if (documentSnapshot.data().LicensePlates == '') {
                            setName(documentSnapshot.data().fullname);
                            setPhoneNumber(documentSnapshot.data().Phone);
                            setPassword(documentSnapshot.data().Password);
                            setImageUser(documentSnapshot.data().imageUser);
                        } else if (documentSnapshot.data().imageUser == '') {
                            setName(documentSnapshot.data().fullname);
                            setLicensePlates(documentSnapshot.data().LicensePlates);
                            setPhoneNumber(documentSnapshot.data().Phone);
                            setPassword(documentSnapshot.data().Password);
                            setImageUser('https://firebasestorage.googleapis.com/v0/b/key-beacon-301606.appspot.com/o/user.png?alt=media&token=9a2487f7-a5a2-47f7-a739-a1db99161375');
                        } else {
                            setName(documentSnapshot.data().fullname);
                            setLicensePlates(documentSnapshot.data().LicensePlates);
                            setPhoneNumber(documentSnapshot.data().Phone);
                            setPassword(documentSnapshot.data().Password);
                            setImageUser(documentSnapshot.data().imageUser);
                        }
                    }
                });

            });
    }

    const onPressEdit = () => {
        SetEditable(true);
    }

    const updateImageUser = async () => {
        const uri = imageUserUpdate.uri;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        const task = storage().ref(filename)
        await task.putFile(uploadUri).catch(error => { console.log(error) });
        const url = await task.getDownloadURL().catch(error => { console.log(error); });
        setUrlImage(url);
    }

    const onPressSignOut = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!');
                alert('See you again!');
                navigation.navigate('SignIn');
            })
    }

    const Camera = () => {
        launchCamera({
            mediaType: 'photo',
            quality: 1,
            includeBase64: true,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = response.assets;
                source.forEach((element) => {
                    setImageUserUpdate({ uri: element.uri });
                })
                setModalVisible(false);
            }
        })
    }

    const ImageLibrary = () => {
        launchImageLibrary({
            mediaType: 'photo',
            videoQuality: 'high',
            maxWidth: 50,
            maxHeight: 50
        }, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            const source = response.assets;
            source.forEach((element) => {
                setImageUserUpdate({ uri: element.uri })
            })
            setModalVisible(false);
        }
        )
    }

    const takePhoto = () => {
        setModalVisible(true);
    }

    const saveProfire = () => {
        updateImageUser();
        var LicensePlatesUpdate = LicensePlates;
        LicensePlatesUpdate = LicensePlatesUpdate.replace('-', '');
        LicensePlatesUpdate = LicensePlatesUpdate.replace('.', '');
        LicensePlatesUpdate = LicensePlatesUpdate.replace(' ', '');
        firestore()
            .collection('Users')
            .doc(document)
            .update({
                Email: email,
                fullname: name,
                Phone: PhoneNumber,
                Password: password,
                LicensePlates: LicensePlatesUpdate,
                imageUser: (urlImage == undefined) ? '' : urlImage
            })
            .then(() => {
                auth().currentUser.updateEmail(email).then(() => {
                    auth().currentUser.updatePassword(password).then(() => {
                        console.log('User updated successfully!');
                        alert('User updated successfully!');
                        SetEditable(false);
                        setUrlImage('');
                        setImageUserUpdate('');
                    }).catch(error => {
                        console.log(error);
                    });
                }).catch(error => {
                    console.log(error);
                })

            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <ScrollView style={styles.mainView}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.headerModal}>Chooses solution for get a photo</Text>
                        <TouchableOpacity onPress={Camera}>
                            <View style={styles.buttonModal1}>
                                <Text style={styles.textButtonModal}>Camera</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ImageLibrary}>
                            <View style={styles.buttonModal2}>
                                <Text style={styles.textButtonModal}>Image Library</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <StatusBar barStyle="light-content" backgroundColor='#fff' />
            <View style={styles.topView}>
                <View style={styles.header}>
                    <View style={styles.imageheader}>
                        <Image
                            source={{ uri: imageUser }}
                            style={{ width: 115, height: 112, borderRadius: 85, }} />
                    </View>
                </View>
                {
                    editable ? (
                        <TouchableOpacity
                            onPress={takePhoto}>
                            <View style={styles.takePhoto}>
                                <Ionicons name='camera-outline' size={25} color={'#fff'} />
                            </View>
                        </TouchableOpacity>
                    ) : (null)
                }

            </View>

            <View style={styles.buttonView}>
                {
                    editable ? (
                        <View style={{ flexDirection: 'row', height: '80%', width: '100%', justifyContent: 'center', marginBottom: height * 1.3 / 100, alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={saveProfire}>
                                <View style={styles.buttonSaveView}>
                                    <LottieView
                                        source={saveAnimation}
                                        style={styles.animationHear}
                                        autoPlay loop />
                                </View>
                                <Text style={styles.textButtonSave}>Save Profire</Text>
                            </TouchableOpacity>
                        </View>
                    )
                        :
                        (
                            <View style={{ flexDirection: 'row', height: '80%', width: '100%', justifyContent: 'center', marginBottom: height * 1.3 / 100, }}>
                                <TouchableOpacity
                                    onPress={onPressEdit}>
                                    <View style={styles.buttonEditView}>
                                        <LottieView
                                            source={editAnimation}
                                            style={styles.animationHear}
                                            autoPlay loop />
                                    </View>
                                    <Text style={styles.textButtonEdit}>Edit Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={onPressSignOut}>
                                    <View style={styles.buttonSignOutView}>
                                        <LottieView
                                            source={signOutAnimation}
                                            style={styles.animationHear}
                                            autoPlay loop />
                                    </View>
                                    <Text style={styles.textButtonSignOut}>Sign Out</Text>
                                </TouchableOpacity>
                            </View>
                        )
                }
            </View>
            <ScrollView style={{ width: '100%', marginTop: height * 2 / 100 }}>
                {
                    name == undefined || email == undefined || PhoneNumber == undefined || password == undefined || LicensePlates == undefined || imageUser == undefined ? (

                        <View style={{ backgroundColor: '#fff', paddingBottom: height * 70 / 100, }}>
                            <ActivityIndicator style={{ marginTop: 30 }} size="large" color="#bcbabc" />
                        </View>
                    ) : (
                        <View style={styles.bottomView}>
                            <View style={styles.inforView}>
                                <Text style={styles.textTextinput}>Username</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={name}
                                    value={name}
                                    onChangeText={setName}
                                    editable={editable}
                                />
                            </View>
                            <View style={styles.inforView}>
                                <Text style={styles.textTextinput}>Email</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={email}
                                    value={email}
                                    onChangeText={setEmail}
                                    editable={editable}
                                />
                            </View>
                            <View style={styles.inforView}>
                                <Text style={styles.textTextinput}>Password</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={password}
                                    value={password}
                                    onChangeText={setPassword}
                                    editable={editable}
                                />
                            </View>
                            <View style={styles.inforView}>
                                <Text style={styles.textTextinput}>LicensePlates</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={LicensePlates}
                                    value={LicensePlates}
                                    onChangeText={setLicensePlates}
                                    editable={editable}
                                />
                            </View>
                            <View style={styles.inforView}>
                                <Text style={styles.textTextinput}>PhoneNumber</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={PhoneNumber}
                                    value={PhoneNumber}
                                    onChangeText={setPhoneNumber}
                                    editable={editable}
                                />
                            </View>
                        </View>
                    )
                }
            </ScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F0F0F0',
    },
    topView: {
        width: '100%',
        height: '20%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    header: {
        width: width * 32 / 100,
        height: height * 17 / 100,
        borderRadius: 70,
    },
    imageheader: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height / 5.9,
    },
    takePhoto: {
        width: width * 11 / 100,
        height: height * 6 / 100,
        borderRadius: 130,
        marginTop: height * -5 / 100,
        marginLeft: width * 18 / 100,
        backgroundColor: '#f73b3b',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonView: {
        width: '100%',
        height: '16%',
        backgroundColor: '#fff',
        marginTop: height * 1 / 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: height * 0.5 / 100,
    },
    buttonEditView: {
        width: width * 23 / 100,
        height: height * 12 / 100,
        backgroundColor: '#fff',
        elevation: 10,
        borderRadius: 10,
        shadowRadius: 10,
        shadowColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: width * 20 / 100,
        paddingLeft: width * 1 / 100,
    },
    textButtonEdit: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#111',
        marginTop: height * 1 / 100,
        marginLeft: width * 0.6 / 100,
    },
    textButtonSignOut: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#111',
        marginTop: height * 1 / 100,
        marginLeft: width * 3.5 / 100,
    },
    buttonSignOutView: {
        width: width * 23 / 100,
        height: height * 12 / 100,
        backgroundColor: '#F23428',
        elevation: 10,
        borderRadius: 10,
        shadowRadius: 10,
        shadowColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: width * 2 / 100,
    },
    buttonSaveView: {
        width: width * 23 / 100,
        height: height * 12 / 100,
        backgroundColor: '#58E858',
        elevation: 10,
        borderRadius: 10,
        shadowRadius: 10,
        shadowColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: width * 0.5 / 100,
        marginTop: height * 1 / 100,
    },
    textButtonSave: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#111',
        marginTop: height * 1 / 100,
    },
    bottomView: {
        width: '100%',
        paddingBottom: height * 8 / 100,
        backgroundColor: '#fff',
        paddingHorizontal: '10%',
        paddingTop: height / 25,
    },
    inforView: {
        width: '100%',
        height: height * 10 / 100,
        marginBottom: height * 3 / 100,
        borderBottomWidth: 1,
        //backgroundColor: '#111',
    },
    textTextinput: {
        color: '#c6c4c4',
        fontSize: 19,
        fontWeight: 'bold',
    },
    textInput: {
        color: '#111',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: height * 0.3 / 100,
        marginLeft: width * -1 / 100,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        width: width * 75 / 100,
        height: height * 40 / 100,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonModal1: {
        //borderWidth: 1,
        borderRadius: 5,
        height: height * 7 / 100,
        width: width * 37 / 100,
        marginBottom: 35,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: '#FFCE54'
    },
    buttonModal2: {
        //borderWidth: 1,
        borderRadius: 5,
        height: height * 7 / 100,
        width: width * 37 / 100,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: '#48CFAD'
    },
    textButtonModal: {
        fontSize: 20,
        //fontWeight: 'bold',
    },
    headerModal: {
        marginBottom: 40,
        fontSize: 19,
        fontWeight: 'bold',
    }
})

export default User;