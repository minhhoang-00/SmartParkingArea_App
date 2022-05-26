import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, PermissionsAndroid} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import database from '@react-native-firebase/database';

import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window');


const Map = () => {

    useEffect(() => {
        if (checkPermission == false) {
            requestLocationPermission();
            setCheckPermission(true);

        }
        getChangScreenValue();
        Geolocation.getCurrentPosition(info => {
            console.log(info);
        });
    })


    const [currentPosition, setCurrentPosition] = useState({
        latitude: 10.73100864570429,
        longitude: 106.61109639715984,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(new Array());
    const [changScreenValue, setChangScreenValue] = useState();
    const [checkPermission, setCheckPermission] = useState(false);

    const requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Permission",
              message:
                "App needs access to your location " +
                "so you can pick your location",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location");
          } else {
            console.log("Location permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };

    const getChangScreenValue = () => {
        database()
            .ref('changeScreen')
            .on('value', snapshot => {
                setChangScreenValue(snapshot.val().changScreenValue);
            })
    }

    const mapRef = useRef();

    return (
        <View style={styles.contain}>
            <MapView
                provider={PROVIDER_GOOGLE}
                ref={mapRef}
                style={styles.mapStyle}
                initialRegion={currentPosition}
            >
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapStyle: {
        width: '100%',
        height: '100%',
    },
    markerStyle: {
        width: width * 9 / 100,
        height: height * 5 / 100,
        resizeMode: 'contain',
    }
});

export default Map;