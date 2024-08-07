import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import {Button, XGroup, Input, YStack} from 'tamagui'

const update = () => {
  //used for handling what button is currently pressed for ui and replacing entries
  const [currentindex, switchindex] = useState(0)


  const [newGame, updatenewGame] = useState({
    "name":"", "year":"", "dev":"", "rating":"", "imagelink":""
  })

  const db = useSQLiteContext();
  const [games, setGames] = useState([])
  const [loading, isLoading] = useState(true)

  /**
   * Adds a new game entry to the games database.
   * 
   * @param {String} name the name of the new game
   * @param {String} uri the URL of the image of the new game
   * @param {String} year the year the game came out
   * @param {String} rating the rating of the game
   * @param {String} dev the games developer
   */
  const insertNewGame = async (name, uri, year, rating, dev) => {
    console.log(name, uri, year, rating, dev)
    await db.runAsync(`
      INSERT INTO games (name, year, rating, developer, imagelink) VALUES (?, ?, ?, ?, ?)`, name,year,rating,dev,uri);
    }

  /**
   * Replaces a game in the database with a new entry.
   * 
   * @param {String} name the name of the new game
   * @param {String} uri the URL of the image of the new game
   * @param {String} year the year the game came out
   * @param {String} rating the rating of the game
   * @param {String} dev the games developer
   * @param {String} gameToReplace the name of the game whos entry will be replaced 
   */
  const updategames = async (name, uri, year, rating, dev, gameToReplace) => {
    console.log(name, uri, year, rating, dev)
    await db.runAsync(`
      UPDATE games SET name = ?, year = ?, rating = ?, developer = ?, imagelink = ? WHERE name = ?`, name,year,rating,dev,uri,gameToReplace);
    }

  const removeGame = async (name) => {
    await db.runAsync(`
      DELETE FROM games WHERE name = ? `, name)
  }

  //does the initial load of the database
  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync('SELECT * FROM games');
      setGames(result);  
      isLoading(false);
    }
    setup();      
  }, []);


  if (loading)
    return (
      <View style={styles.container}>
      <Text>Loading</Text>
      
  </View>)
else {return (
    <View style={styles.container}>
     <Text>Item to Replace</Text>
     <View style={styles.buttonBar}>
     <Button onPress={()=> switchindex(Math.max(currentindex - 1, 0))}>{'<'}</Button>
        <Text style={styles.label}>{games[currentindex].name}</Text>
        <Button onPress={()=> switchindex(Math.min(currentindex + 1, games.length - 1))}>{'>'}</Button>
        </View>
        <YStack
        width={250}
        padding="$4">
        <Input size="$4" borderWidth={2} onChangeText={image => updatenewGame({...newGame, imagelink:image})} placeholder="Paste Image URL here"/>
        <Input size="$4" borderWidth={2} onChangeText={name => updatenewGame({...newGame, name:name})} placeholder="New Name"/>
        <Input size="$4" borderWidth={2} onChangeText={rating => updatenewGame({...newGame, rating:rating})} placeholder="New Rating"/>
        <Input size="$4" borderWidth={2} onChangeText={year => updatenewGame({...newGame, year:year})} placeholder="New Year"/>
        <Input size="$4" borderWidth={2} onChangeText={dev => updatenewGame({...newGame, developer:dev})} placeholder="New Developer"/>
        </YStack>

      {/* <TextInput
        style={styles.input}
        
        
        placeholderTextColor="#888"
      />
            <TextInput
        style={styles.input}
        
        
        placeholderTextColor="#888"
      />
            <TextInput
        style={styles.input}
        
        
        placeholderTextColor="#888"
      />
            <TextInput
        style={styles.input}
        
        
        placeholderTextColor="#888"
      />
        <TextInput
        style={styles.input}
        
        
        placeholderTextColor="#888"
      /> */}
      <XGroup>
        <XGroup.Item>
          <Button theme='blue' onPress={() => {updategames(newGame.name, newGame.imagelink, newGame.year, newGame.rating, newGame.developer, games[currentindex].name)}}>Submit</Button>
        </XGroup.Item>
        <XGroup.Item>
          <Button theme='green' onPress={() => {insertNewGame(newGame.name, newGame.imagelink, newGame.year, newGame.rating, newGame.developer)}}>Add New</Button>
        </XGroup.Item>
        <XGroup.Item>
          <Button theme='red' onPress={() => {removeGame(games[currentindex].name)}}>Delete</Button>
        </XGroup.Item>
      </XGroup>
      {/* <Button label={"submit"} ></Button>
            <Button label={"Add New"} ></Button>
                  <Button label={"Delete"} ></Button> */}
    </View>
  );
}}



const styles = StyleSheet.create({
  label: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 13,
    borderRadius: 5,
    width: 200,
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '80%',
    backgroundColor: '#fff',
  },
  text: {
    padding: 10,
    fontSize: 42,
    color: '#333',
  },
  buttonBar: {
    flexDirection: "row",
    justifyContent: "space-around",
  }
});

export default update;
