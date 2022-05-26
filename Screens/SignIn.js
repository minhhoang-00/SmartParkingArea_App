import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const SignIn = ({ navigation }) => {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const navigateSignUp = () => {
        navigation.navigate("SignUp");
    }

    const navigateForgotPassword = () => {
        navigation.navigate("ForgotPassword");
    }

    const updateEmailpresent = () => {
        database()
            .ref('emailPresent')
            .update({
                email: Email
            })
            .then(() => {
                console.log('Email updated successfully!');
            })
    }

    const getUID = () => {
        auth().onAuthStateChanged(user => {
            if (user) {
                database()
                    .ref('UIDUsers')
                    .update({
                        UID: user.uid
                    })
                    .then(() => {
                        console.log('Email updated successfully!');
                    })
            }
        });
    }

    const SignIn = () => {
        if (Email == '' || Password == '') {
            alert("Please fill all the fields");
        } else {
            auth()
                .signInWithEmailAndPassword(Email, Password)
                .then(() => {
                    console.log('User account signed in Successfullly!');
                    updateEmailpresent();
                    getUID();
                    navigation.navigate("MainContainer");
                })
                .catch(error => {
                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is not valid!');
                        alert('That email address is not valid!');
                    }

                    if (error.code === 'auth/user-disabled') {
                        console.log('That user corresponding to the given email has been disabled!');
                        alert('That user corresponding to the given email has been disabled!');
                    }
                    if (error.code === 'auth/user-not-found') {
                        console.log('There is no user corresponding to the given email!');
                        alert('There is no user corresponding to the given email!');
                    }
                    if (error.code === 'auth/wrong-password') {
                        console.log('That password is incorrect!');
                        alert('That password is incorrect!');
                    }
                    console.error(error);
                });
        }
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.TopView}>
                <Image
                    source={require('../Assets/images/logo.jpg')}
                    style={styles.ImageStyle}
                />
            </View>
            <View style={styles.BottomView}>
                <Text style={styles.Heading}>
                    WellCome
                </Text>
                <View style={styles.FormView}>
                    <TextInput
                        style={styles.TextInput1}
                        placeholder={"Email address*"}
                        placeholderTextColor={"#fff"}
                        value={Email.trim()}
                        onChangeText={setEmail} />
                    <TextInput
                        style={styles.TextInput2}
                        placeholder={"Password*"}
                        placeholderTextColor={"#fff"}
                        value={Password}
                        onChangeText={setPassword}
                        secureTextEntry={true} />
                    <TouchableOpacity
                        style={styles.Button}
                        onPress={SignIn}>
                        <Text style={styles.ButtonText}>Sign in</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.TextButton} onPress={navigateSignUp}>
                    <Text style={styles.signUpText}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.TextButton} onPress={navigateForgotPassword}>
                    <Text style={styles.signUpText}>Forgot Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TopView: {
        width: '100%',
        height: '35%',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    BottomView: {
        width: '100%',
        height: '65%',
        backgroundColor: '#000',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    ImageStyle: {
        width: '75%',
        height: '50%',
        margin: '2%',
        resizeMode: 'contain',
    },
    Heading: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
        marginLeft: '4.6%',
        marginTop: 30,
    },
    FormView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40,
    },
    TextInput1: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        height: 52,
        borderRadius: 10,
        paddingLeft: 5,
        color: '#fff',
    },
    TextInput2: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        height: 52,
        borderRadius: 10,
        paddingLeft: 5,
        marginTop: 20,
        color: '#fff',
    },
    Button: {
        width: '90%',
        color: '#000',
        height: 52,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#111',
    },
    signUpText: {
        color: 'gray',
        fontSize: 16,
    },
    TextButton: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
    }
});

export default SignIn;