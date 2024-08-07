import { Slot } from 'expo-router';
import NavBar from '../components/NavBar'

import {SQLiteProvider} from 'expo-sqlite'

export default function HomeLayout() {

  return (
    <SQLiteProvider databaseName='games.db' onInit={initializeDB}> 
    <NavBar/>
  <Slot />
  </SQLiteProvider>
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
      await db.runAsync('INSERT INTO games (name, year, rating, developer, imagelink) VALUES (?, ?, ?, ?, ?)', "ROR2", "2014", "98", "Gearbox Games", "https://www.google.com/imgres?q=ROR2%20cover%20art&imgurl=https%3A%2F%2Ff4.bcbits.com%2Fimg%2Fa1339632586_10.jpg&imgrefurl=https%3A%2F%2Fchrischristodoulou.bandcamp.com%2Falbum%2Frisk-of-rain-2-4&docid=nTtF4A08Q66XSM&tbnid=GvXza5Ua1N-pWM&vet=12ahUKEwiUuv3Htb2HAxXbKhAIHRN5Ed0QM3oECB0QAA..i&w=1200&h=1200&hcb=2&ved=2ahUKEwiUuv3Htb2HAxXbKhAIHRN5Ed0QM3oECB0QAA" );
      await db.runAsync('INSERT INTO games (name, year, rating, developer, imagelink) VALUES (?, ?, ?, ?, ?)', "Path of Exile", "2014", "67", "Grinding Gear Games", "https://www.google.com/imgres?q=Path%20of%20exile%20cover%20art&imgurl=https%3A%2F%2Fe.snmc.io%2Flk%2Ff%2Fx%2F8f06205fe0fc34acda7a6c5c9258f213%2F5288895&imgrefurl=https%3A%2F%2Fglitchwave.com%2Fgame%2Fpath-of-exile%2F&docid=azIsMXCSf0JJ0M&tbnid=mpSl0aScVbPPaM&vet=12ahUKEwiK1MLRtb2HAxU_KhAIHVNIBoYQM3oECDoQAA..i&w=600&h=838&hcb=2&ved=2ahUKEwiK1MLRtb2HAxU_KhAIHVNIBoYQM3oECDoQAA" );
  }
  const firstRow = await db.getFirstAsync('SELECT * FROM games');
  console.log(firstRow.name, firstRow.year, firstRow.actors, firstRow.imageIndex);
}
