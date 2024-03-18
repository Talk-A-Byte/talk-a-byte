import React from "react";
import { Text, StyleSheet, View, SafeAreaView, Pressable, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


export default function LandingPage() {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#ffc800', '#4bcc99', '#008073']}
                style={styles.content}
                start={{ x: 2, y: 0 }}
                end={{ x: 2, y: 1 }}
            >
                <Text style={styles.text}>Talk A Byte</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate("HomeStack", { screen: "HomeScreen" })
                    }}
                >
                    <Ionicons name="arrow-forward" size={25} color={"#008073"} />
                </TouchableOpacity>
            </LinearGradient>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 60,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
        width: 150,
        height: 40,
        backgroundColor: "white",
        borderRadius: 26,
        justifyContent: "center",
        alignItems: "center",
    },
});
