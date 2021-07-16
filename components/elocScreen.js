import axios from 'axios';
import React, { Component, useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, StyleSheet, Button, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

function FindLoc({ route }) {
    const { locid } = route.params;
    // console.log(locid);
    // var text = 'C16FAA';
    const [data, setData] = useState([]);
    useEffect(async () => {
        var url = '/apis/O2O/entity/' + locid;
        const Oauth = axios.create({
            baseURL: 'https://outpost.mapmyindia.com/api'
        });
        const nearby = axios.create({
            baseURL: 'https://explore.mapmyindia.com'
        });
        const response = await Oauth.post('/security/oauth/token?grant_type=client_credentials&client_id=33OkryzDZsJD007QlbSm5D5kuQ1M3P-wyyobauMAQ8khmvhz9j_wNGW9hzvqqz02MyYiCbcxAcm4P5zVbSP2Jg==&client_secret=lrFxI-iSEg9jK3WRAVlYQ8uwgDlAThYYnsckiLHPJFKf6JXnZk8yT-lzrESPHcMkKYgDDHA8fMCkuD2ai8KrI_hi18zb8PZY'
        );
        // console.log(response.data);
        const token = response.data.access_token;
        const res = await nearby.get(url, {
            headers: {
                Authorization: `bearer ${token}`
            }
        });
        const ObjectTest = res.data;
        setData(ObjectTest);
    }, []);


    return (
        <View style={styles.container}>
            <View >
                <Text >{data.name}</Text>
                <Text >{data.address}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#fff',
    },
    listItem: {
        marginHorizontal: 40,
        marginVertical: 10,
        paddingHorizontal: 80,
        paddingVertical: 20,
        backgroundColor: "#FFF",
        width: "150%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5
    },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
    },
});
export default FindLoc