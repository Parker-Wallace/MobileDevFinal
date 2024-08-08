import { Slot } from 'expo-router';
import NavBar from '../components/NavBar'
import {SQLiteProvider} from 'expo-sqlite'
import { TamaguiProvider, createTamagui} from 'tamagui'
import defaultConfig from '@tamagui/config/v3'





export default function HomeLayout() {
const config = createTamagui(defaultConfig)
  return (
<TamaguiProvider config={config}>    
  <SQLiteProvider databaseName='games.db' onInit={initializeDB}> 
    <NavBar/>
  <Slot />
  </SQLiteProvider>
  </TamaguiProvider>


);
}
async function initializeDB(db) {
  await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS games (name TEXT PRIMARY KEY NOT NULL, year TEXT NOT NULL, rating TEXT NOT NULL, developer TEXT NOT NULL, imagelink TEXT NOT NULL);
  `);
   const result = await db.getAllAsync('SELECT * FROM games');
  if( result.length == 0 ) {
      await db.runAsync('INSERT INTO games (name, year, rating, developer, imagelink) VALUES (?, ?, ?, ?, ?)', "Pong", "1997", "94", "Konami", "https://cdn.mobygames.com/covers/2208736-pong-atari-8-bit-front-cover.jpg" );
      await db.runAsync('INSERT INTO games (name, year, rating, developer, imagelink) VALUES (?, ?, ?, ?, ?)', "ROR2", "2014", "98", "Gearbox Games", "https://m.media-amazon.com/images/I/719jsqg1B4L.jpg" );
      await db.runAsync('INSERT INTO games (name, year, rating, developer, imagelink) VALUES (?, ?, ?, ?, ?)', "Path of Exile", "2014", "67", "Grinding Gear Games", "https://image.api.playstation.com/cdn/EP4956/CUSA11782_00/czANsmjfgn1vkJ2rQxmgRhdyEa8nRXwD.png" );
  }
  const firstRow = await db.getFirstAsync('SELECT * FROM games');
  console.log(firstRow.name, firstRow.year, firstRow.actors, firstRow.imageIndex);
}
