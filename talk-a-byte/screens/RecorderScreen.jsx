import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Pressable } from "react-native"


export default function RecorderScreen() {

    return (
        <View style={styles.container}>
            <Pressable style={{ marginTop: 20 }} onPress={() => {
                console.log("aduh kepencet");
            }}>
                <Ionicons name="arrow-back" size={25} color={"white"} />
            </Pressable>
            <View style={{ alignItems: "center" }}>
                <View style={styles.textBoard}>
                    <Pressable style={{ alignItems: "flex-end", marginHorizontal: 20, marginVertical: 20 }} onPress={() => {
                        console.log("copy that");
                    }}>
                        <Ionicons name="copy-outline" size={45} color={"#008073"} />
                    </Pressable>
                </View>
                <Pressable onPress={() => {
                    console.log("kepncte");
                }}>
                    <View style={styles.cardButton}>
                        <Ionicons name="mic-outline" size={100} color={"#008073"} />
                    </View>
                </Pressable>
            </View>
        </View>
    )
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
        width: 150,
        height: 150,
        backgroundColor: "yellow",
        borderRadius: 24,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    textBoard: {
        width: 320, height: 350, backgroundColor: "white", marginVertical: 40, borderRadius: 24
    }
});
