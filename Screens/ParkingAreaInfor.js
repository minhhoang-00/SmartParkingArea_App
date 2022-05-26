import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const { width, height } = Dimensions.get('window');
const urlImage = 'https://cafefcdn.com/thumb_w/650/203337114487263232/2021/11/25/photo1637810892626-1637810892765226827282.jpg';

const ParkingAreaInfor = ({ navigation }) => {
    return (
        <View style={styles.contain}>
            <View style={styles.imageHeader}>
                <Image
                    source={{ uri: urlImage }}
                    style={styles.image}
                />
            </View>
            <View style={styles.body}>
                <View style={styles.infor}>
                    <Text style={[styles.text, {
                        fontSize: 35,
                    }]}>Aeon Mall</Text>
                    <Text style={[styles.text, {
                        fontSize: 17,
                        color: '#bcbec4',
                        fontFamily: 'Ubuntu-Regular',
                        marginTop: height * 1 / 100,
                    }]}>Bình Tân District, HCM City</Text>
                </View>
                <View style={styles.char}>
                    {/* <PieChart
                        data={[
                            {
                                name: "Seoul",
                                population: 21500000,
                                color: "rgba(131, 167, 234, 1)",
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15
                            },
                            {
                                name: "Toronto",
                                population: 2800000,
                                color: "#F00",
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15
                            },
                        ]}
                        width={width * 79 / 100} // from react-native
                        height={height * 39 / 100}
                        chartConfig={{
                            backgroundGradientFrom: "#1E2923",
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientTo: "#08130D",
                            backgroundGradientToOpacity: 0.5,
                            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                            strokeWidth: 2, // optional, default 3
                            barPercentage: 0.5,
                            useShadowColorFromDataset: false // optional
                        }}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[10, 50]}
                        absolute
                    /> */}
                </View>
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
        //paddingTop: height * 2 / 100,
    },
    text: {
        fontSize: 25,
        color: '#111',
        fontFamily: 'Ubuntu-Bold',
    },
    imageHeader: {
        marginTop: height * -1 / 100,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#111',
        width: width * 100 / 100,
        height: height * 30 / 100,
    },
    image: {
        width: width * 100 / 100,
        height: height * 30 / 100,
        resizeMode: 'contain',
        //borderRadius: 5,
    },
    body: {
        width: width * 100 / 100,
        height: height * 76 / 100,
        backgroundColor: '#fff',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        marginTop: height * -3.5 / 100,
        paddingHorizontal: width * 8 / 100,
    },
    infor: {
        marginTop: height * 3 / 100,
        width: width * 100 / 100,
        height: height * 10 / 100,
        justifyContent: 'center',
    },
    char: {
        width: width * 100 / 100,
        height: height * 20 / 100,
        backgroundColor: '#111',
    }
})

export default ParkingAreaInfor;