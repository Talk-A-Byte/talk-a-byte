import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, StyleSheet, Pressable, Image, Text, FlatList } from "react-native"

export default function GalleryScreen() {

    const [gallery, setGallery] = useState([
        {
            image: 'https://i.pinimg.com/564x/5f/7e/c2/5f7ec255d7927e360af2a6e767c3dd74.jpg',
        }, {

            image: 'https://i.pinimg.com/564x/5f/7e/c2/5f7ec255d7927e360af2a6e767c3dd74.jpg',
        }, {

            image: 'https://i.pinimg.com/564x/5f/7e/c2/5f7ec255d7927e360af2a6e767c3dd74.jpg',
        }, {

            image: 'https://i.pinimg.com/564x/5f/7e/c2/5f7ec255d7927e360af2a6e767c3dd74.jpg',
        }, {

            image: 'https://i.pinimg.com/564x/5f/7e/c2/5f7ec255d7927e360af2a6e767c3dd74.jpg',
        }, {

            image: 'https://i.pinimg.com/564x/5f/7e/c2/5f7ec255d7927e360af2a6e767c3dd74.jpg',
        }, {
            image: 'https://i.pinimg.com/564x/5f/7e/c2/5f7ec255d7927e360af2a6e767c3dd74.jpg',

        }, {
            image: 'https://i.pinimg.com/564x/5f/7e/c2/5f7ec255d7927e360af2a6e767c3dd74.jpg',

        }, {
            image: 'https://i.pinimg.com/564x/5f/7e/c2/5f7ec255d7927e360af2a6e767c3dd74.jpg',

        }, {
            image: 'https://i.pinimg.com/564x/5f/7e/c2/5f7ec255d7927e360af2a6e767c3dd74.jpg',

        }, {

            image: 'https://i.pinimg.com/564x/5f/7e/c2/5f7ec255d7927e360af2a6e767c3dd74.jpg',
        }, {
            image: 'https://i.pinimg.com/564x/5f/7e/c2/5f7ec255d7927e360af2a6e767c3dd74.jpg',

        }, {
            image: 'https://i.pinimg.com/564x/5f/7e/c2/5f7ec255d7927e360af2a6e767c3dd74.jpg',

        }, {

            image: 'https://i.pinimg.com/564x/5f/7e/c2/5f7ec255d7927e360af2a6e767c3dd74.jpg',
        }, {

            image: 'https://i.pinimg.com/564x/5f/7e/c2/5f7ec255d7927e360af2a6e767c3dd74.jpg',
        }
    ])
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 25 }}>
                <Pressable onPress={() => {
                    console.log("back");
                }}>
                    <Ionicons name="arrow-back" size={30} color={"white"} />
                </Pressable>
                <Pressable onPress={() => {
                    console.log("exit");
                }}>
                    <Ionicons name="exit-outline" size={30} color={"white"} />
                </Pressable>
            </View>

            <View style={{ marginTop: 40 }}>
                <FlatList
                    data={gallery}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: "row", marginVertical: 5 }}>
                            <Image source={{ uri: `${item.image}` }} style={{ width: 150, height: 150, borderRadius: 16 }} />
                            <Image source={{ uri: `${item.image}` }} style={{ width: 150, height: 150, marginHorizontal: 10, borderRadius: 16 }} />
                        </View>
                    )}

                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: "#008073",
    },
    text: {
        color: "white",
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10
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
        width: 310,
        height: 300,
        backgroundColor: "white",
        borderRadius: 24
    }
});