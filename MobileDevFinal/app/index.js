import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text} from "react-native";
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Games from '../components/Games';
import { useSQLiteContext } from "expo-sqlite";

export default function App() {
const db = useSQLiteContext();
const [currentindex, switchindex] = useState(0)
const [loading, isLoading] = useState(true)
const [games, setGames] = useState([])


useEffect(() => {
  async function setup() {
    const result = await db.getAllAsync('SELECT * FROM games');
    setGames(result);  
    isLoading(false)
  }
  setup();      
}, []);


if (loading) {
  return (
    <View style={styles.container}>
    <Text style={styles.name}>Loading</Text>
    </View>
    );
  } else {
  return (
    <View style={styles.container}>
        <Games props = {games[currentindex]}/>    
      <View style={styles.navigationButtons}>
        <Button label={"<"} onPress={()=> switchindex(Math.max(currentindex - 1, 0))}></Button>
        <Text style={styles.label}>Ranking: {currentindex + 1}</Text>
        <Button label={'>'} onPress={()=> switchindex(Math.min(currentindex + 1, games.length - 1))}></Button>
        
      </View>
      <StatusBar style="auto" />
    </View>
  );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  label: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 13,
    borderRadius: 5,

    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
