import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

const { width, height } = Dimensions.get('window');


const SystemInforPanel = ({ navigation }) => {

    const get4Days = () => {
        const date = new Date();
        const days = [];
        for (let i = 0; i < 4; i++) {
            days.push(date.toLocaleDateString('en-US', { year: "2-digit", month: "2-digit", day: "2-digit" }));
            date.setDate(date.getDate() - 1);
        }
        return days;
    }

    const get4Month = () => {
        const date = new Date();
        const months = [];
        for (let i = 0; i < 4; i++) {
            months.push(date.toLocaleDateString('en-US', { month: "2-digit" }));
            date.setMonth(date.getMonth() - 1);
        }
        return months;
    }

    const dataParkingArea = {
        labels: get4Month(),
        datasets: [
            {
                data: [20, 45, 28, 80]
            }
        ]
    };

    return (
        <View style={styles.contain}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>System Information Panel</Text>
            </View>
            <ScrollView style={{ width: width * 80 / 100 }}>
                <View style={{ height: height * 100 / 100, paddingTop: height * 2 / 100}}>
                    <View style={styles.parkingInfor}>
                        <Text style={[styles.textHeader, {
                            marginTop: height * 2 / 100,
                            marginBottom: height * 2 / 100,
                        }]}>Parking Area Params</Text>
                        <View style={{ backgroundColor: '#fff', width: '98%', height: '97%', justifyContent: 'center', alignItems: 'center', borderRadius: 17, }}>
                            <LineChart
                                data={{
                                    labels: get4Days(),
                                    datasets: [
                                        {
                                            data: [20, 45, 28, 80]
                                        }
                                    ]
                                }}
                                xLabelsOffset={5}
                                yLabelsOffset={10}
                                fromZero={true}
                                withInnerLines={true}
                                width={width * 79 / 100} // from react-native
                                height={height * 39 / 100}
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "#e26a00",
                                    backgroundGradientFrom: "#fb8c00",
                                    backgroundGradientTo: "#ffa726",
                                    decimalPlaces: 0, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16,
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }
                                }}
                                bezier
                                style={{
                                    borderRadius: 14,
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.userInfor}>
                        <Text style={[styles.textHeader, {
                            marginTop: height * 8 / 100,
                            marginBottom: height * 2 / 100,
                        }]}>User Params</Text>
                        <View style={{ backgroundColor: '#fff', width: '98%', height: '98%', justifyContent: 'center', borderRadius: 17, }}>
                            <BarChart
                                data={{
                                    labels: get4Days(),
                                    datasets: [
                                        {
                                            data: [20, 45, 28, 80]
                                        }
                                    ]
                                }}
                                xLabelsOffset={5}
                                yLabelsOffset={10}
                                fromZero={true}
                                withInnerLines={true}
                                width={width * 79 / 100} // from react-native
                                height={height * 39 / 100}
                                yAxisInterval={5} // optional, defaults to 1
                                chartConfig={{
                                    barPercentage: 0.5,
                                    backgroundColor: "#182F85",
                                    backgroundGradientFrom: "#4664bf",
                                    backgroundGradientTo: "#4159af",
                                    decimalPlaces: 0, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    barPercentage: 0.5,
                                }}
                                bezier
                                style={{
                                    borderRadius: 18,
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.notification}></View>
                </View>
            </ScrollView>
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
    parkingInfor: {
        width: width * 80 / 100,
        height: height * 40 / 100,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height * 2 / 100,
    },
    userInfor: {
        width: width * 80 / 100,
        height: height * 39 / 100,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 3 / 100,
    },
})

export default SystemInforPanel;