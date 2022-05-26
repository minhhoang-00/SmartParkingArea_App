import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity } from "react-native";
import auth from '@react-native-firebase/auth';

const ForgotPassword = ({ navigation }) => {

    const [Email, setEmail] = useState('');

    const navigate = () => {
        navigation.navigate("SignIn");
    }

    const resetPassword = () => {
        console.log("reset email sent to " + Email);
        auth()
            .sendPasswordResetEmail(Email, null)
            .then(() => {
                navigate();
                alert("reset email sent to " + Email);
            })
            .catch((error) => {
                if (error === 'auth/invalid-email') {
                    console.log('That email address is not valid!');
                    alert('That email address is not valid!');
                }
                if (error === 'auth/user-not-found') {
                    console.log('There is no user corresponding to the given email!');
                    alert('There is no user corresponding to the given email!');
                }
                console.log(error);
            });
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
                    Reset Password
                </Text>
                <View style={styles.FormView}>
                    <TextInput
                        style={styles.TextInput1}
                        placeholder={"Email address*"}
                        placeholderTextColor={"#fff"}
                        value={Email}
                        onChangeText={setEmail} />
                    <TouchableOpacity
                        style={styles.Button}
                        onPress={resetPassword}
                    >
                        <Text style={styles.ButtonText}>Reset Password</Text>
                    </TouchableOpacity>
                </View>
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
        marginLeft: 15,
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

export default ForgotPassword;