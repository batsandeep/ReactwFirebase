import React, { Component, useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, StyleSheet, Button, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import firestore from "@react-native-firebase/firestore"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import FindLoc from './components/elocScreen';
import addD from './components/addData';
import { blue } from 'chalk';
function FirebaseApp({ navigation }) {
  const [inp, setInp] = useState('');
  const [loc, setLoc] = useState('');
  // const [inptext, setInptext] = useState('');
  const [users, setUsers] = useState([]);
  const getAns = () => {
    Keyboard.dismiss();
    if (inp == '') {
      const subscriber = firestore()
        .collection('POI')
        .onSnapshot(querySnapshot => {
          const users = [];
          querySnapshot.forEach(documentSnapshot => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setUsers(users);
        });
    }
    else {
      const subscriber = firestore()
        .collection('POI')
        .where('Tag', 'array-contains', inp)
        .onSnapshot(querySnapshot => {
          const users = [];
          querySnapshot.forEach(documentSnapshot => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setUsers(users);
        });
    }
    setInp('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.writeTopWrapper}>
      <Text style={styles.sectionTitle}> Data </Text>
      <TouchableOpacity style= {{ marginTop: 10}} onPress={() => navigation.navigate('Addp')}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.inputView} >
        <TextInput style={styles.input} placeholder={'Tags..'} onChangeText={text => setInp(text)} value={inp}/>
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={() => getAns()}>
        <Text style={styles.addText}>GO</Text>
      </TouchableOpacity>
      <View style={styles.taskswrapper}>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <View style={{ height: 60, flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 15, marginTop: 15 }}>
              <Text>Name: {item.Alt_name}</Text>
              <Text>City: {item.City}</Text>
              <Text>eLoc ID: {item['eLoc ID']}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Eloc', {
                locid: item['eLoc ID']
              })}>
                <Text style={styles.smore}>show more</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={FirebaseApp} />
        <Stack.Screen name="Eloc" component={FindLoc} />
        <Stack.Screen name="Addp" component={addD} />
      </Stack.Navigator>
    </NavigationContainer>
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
  inputView: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    padding: 20
  },
  writeTopWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  smore: {
    color: 'blue'
  },
  input: {
    height: 50,
    color: "white"
  },
  addWrapper: {
    width: 45,
    height: 45,
    backgroundColor: '#fb5b5a',
    borderRadius: 20,
    borderColor: '#C0C0C0',
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
  },
  taskswrapper: {
    marginTop: 10,
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

export default App;
