import React from "react";
import { FlatList, StatusBar, StyleSheet, Dimensions, Image } from "react-native";
import { SafeAreaView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {
    const data = [1, 2, 3];

    const renderCard = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: 'https://i.pinimg.com/564x/5f/7e/c2/5f7ec255d7927e360af2a6e767c3dd74.jpg' }} style={{ flex: 1, width: "100%", height: "100%", resizeMode: "cover", borderRadius: 54 }} />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Ionicons name="hand-left-outline" size={30} color={"white"} />
                <Ionicons name="exit-outline" size={30} color={"white"} />
            </View>
            <View>
                <Text style={styles.text}>
                    Talk A Byte
                </Text>
                <Ionicons name="folder-open-outline" size={30} color={"#ffc800"} />
            </View>
            <FlatList
                horizontal
                data={data}
                renderItem={renderCard}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ flexGrow: 1, flexDirection: "row" }}
                style={{ width: windowWidth }}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={styles.cardButton}>
                    <Ionicons name="camera-outline" size={100} color={"#008073"} />
                </View>
                <View style={styles.cardButton}>
                    <Ionicons name="mic-outline" size={100} color={"#008073"} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#008073",
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
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10
    },
    card: {
        width: 300,
        height: 359,
        borderRadius: 54,
        marginVertical: 10,
        marginRight: 15
    },
    cardButton: {
        width: 170,
        height: 170,
        backgroundColor: "yellow",
        borderRadius: 24,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    }
});
