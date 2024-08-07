import { Link } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";

export default function NavBar() {
    return (
        <View style={styles.navBar}>
            <Link href={"/edit"} asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>Edit</Text>
                </Pressable>
            </Link>
            <Link href={"/"} asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>Home</Text>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#2c3e50",
        paddingVertical: 35,
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: '#34495e',
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
