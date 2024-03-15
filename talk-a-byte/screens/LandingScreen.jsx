import React from "react";
import { Text, StyleSheet, View, SafeAreaView, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";

export default function LandingPage() {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#ffc800', '#4bcc99', '#008073']}
                style={styles.content}
                start={{ x: 2, y: 0 }}
                end={{ x: 2, y: 1 }}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Talk A Byte</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>
                            <Ionicons name="arrow-forward" size={25} color={"#008073"} />
                        </Text>
                    </Pressable>
                </View>
            </LinearGradient>
        </SafeAreaView>
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
    textContainer: {
        flex: 1,
        justifyContent: "flex-end",
    },
    text: {
        color: "white",
        fontSize: 60,
        fontWeight: "bold",
        marginBottom: 20,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "flex-end",
        bottom: 80
    },
    button: {
        width: 150,
        height: 40,
        backgroundColor: "white",
        borderRadius: 26,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        textAlign: "center",
        padding: 5,
    },
});
