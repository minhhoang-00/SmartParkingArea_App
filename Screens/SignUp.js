import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUp = ({ navigation }) => {

    const [FullName, setFullName] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [LicensePlates, setLicensePlates] = useState('');
    const [imageUser, setImageUser] = useState('https://firebasestorage.googleapis.com/v0/b/key-beacon-301606.appspot.com/o/user.png?alt=media&token=bc9f8840-5d5f-47d2-941a-6cc85816f1a0');
    const [dataUsers, setDataUsers] = useState(new Array());

    const SignUp = () => {

        if (FullName == '' || Email == '' || Phone == '' || Password == '' || ConfirmPassword == '') {
            alert("Please fill all the fields");
        } else if (Password != ConfirmPassword) {
            alert("Password and Confirm Password does not match");
        } else {

            auth()
                .createUserWithEmailAndPassword(Email, Password)
                .then(() => {
                    console.log('User account created successfully!');
                    saveUser();
                    navigation.navigate("SignIn");
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                        alert('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                        alert('That email address is invalid!');
                    }
                    if (error.code === 'auth/weak-password') {
                        console.log('That password is too weak!');
                        alert('That password is too weak! \n [ Password should be at least 6 characters ]');
                    }
                    console.error(error);
                });


        }
    }


    const saveUser = () => {
        firestore()
            .collection('Users')
            .add({
                fullname: FullName,
                Email: Email,
                Phone: Phone,
                Password: Password,
                LicensePlates: LicensePlates,
                imageUser: imageUser,
            })
            .then(() => {
                console.log('User added!');
                setFullName('');
                setEmail('');
                setPhone('');
                setPassword('');
                setConfirmPassword('');
                setLicensePlates('');
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
            <ScrollView style={styles.BottomView}>
                <Text style={styles.Heading}>
                    Create Account
                </Text>
                <View style={styles.FormView}>
                    <TextInput
                        style={styles.TextInput1}
                        placeholder={"Full name*"}
                        placeholderTextColor={"#fff"}
                        value={FullName}
                        onChangeText={setFullName} />
                    <TextInput
                        style={styles.TextInput2}
                        placeholder={"Email address*"}
                        placeholderTextColor={"#fff"}
                        value={Email}
                        onChangeText={setEmail} />
                    <TextInput
                        style={styles.TextInput2}
                        placeholder={"Phone*"}
                        placeholderTextColor={"#fff"}
                        value={Phone}
                        onChangeText={setPhone} />
                    <TextInput
                        style={styles.TextInput2}
                        placeholder={"Password*"}
                        placeholderTextColor={"#fff"}
                        secureTextEntry={true}
                        value={Password}
                        onChangeText={setPassword} />
                    <TextInput
                        style={styles.TextInput2}
                        placeholder={"Confirm Password*"}
                        placeholderTextColor={"#fff"}
                        secureTextEntry={true}
                        value={ConfirmPassword}
                        onChangeText={setConfirmPassword} />
                    <TouchableOpacity
                        style={styles.Button}
                        onPress={SignUp}>
                        <Text style={styles.ButtonText}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        height: '20%',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    BottomView: {
        width: '100%',
        height: '80%',
        backgroundColor: '#000',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    ImageStyle: {
        width: '75%',
        height: '65%',
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
        marginTop: '-5%',
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
    },
    TextButton: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
    }
});

export default SignUp;