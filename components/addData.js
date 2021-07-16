import React, { Component, useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, StyleSheet, Button, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import firestore from "@react-native-firebase/firestore"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

function addD() {
    const [name, setName] = useState('');
    const [cat, setCat] = useState('');
    const homeW = () => {
        Keyboard.dismiss();
            firestore()
            .collection('POI')
            .doc('newData')
            .set({
                Alt_name: name,
                Category: cat,
            })
            .then(() => {
                console.log('POI added!');
              });
              setName('');
              setCat('');
    }
    return (
        <View style={styles.container}>
        <Text style={styles.sectionTitle}> Add POI </Text>
        <View style={styles.inputView} >
          <TextInput style={styles.input} placeholder={'Enter POI name'} onChangeText={text => setName(text)} value = {name} /></View>
        <View style={styles.inputView} >
          <TextInput style={styles.input} placeholder={'Enter Category'} onChangeText={text => setCat(text)} value = {cat} />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => homeW()}>
        <Text style={styles.addText}>ADD</Text>
      </TouchableOpacity>
      </View>
    );
}

export default addD;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: '#fff',
    },
    sectionTitle: {
      fontWeight: "bold",
      fontSize: 50,
      color: "#fb5b5a",
      marginBottom: 30,
      marginTop: 10
    },
    inputView: {
      width: "80%",
      backgroundColor: "#fb5b5a",
      borderRadius: 25,
      height: 50,
      marginBottom: 20,
      justifyContent: "center",
      padding: 20
    },
    input: {
      height: 50,
      color: "white"
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
      },
      addText: {},
  });