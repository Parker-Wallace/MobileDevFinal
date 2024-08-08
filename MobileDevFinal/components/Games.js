import { StyleSheet, View } from 'react-native';
import {Image, Text} from 'tamagui'

export default function Games({props}) {

{return (
  <View style={styles.container}>
    <Text style={styles.name}>{props["name"]}</Text>
    <Image source={{uri: `${props["imagelink"]}`, width: 300, height:500,}}/>
    <Text style={styles.year}>{props["year"]}</Text>
    <Text style={styles.rating}>{props["rating"]}</Text>
    <Text style={styles.developer}>{props["developer"]}</Text>
</View>
  );
}}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    width: 400,
    height: 500,
    marginBottom: 8,
  },
  year: {
    fontSize: 18,
    color: '#888',
    marginBottom: 4,
  },
  rating: {
    fontSize: 18,
    color: '#888',
    marginBottom: 4,
  },
  developer: {
    fontSize: 18,
    color: '#888',
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
})