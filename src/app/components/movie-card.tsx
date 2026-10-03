import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Button from "./button"
import { Favorite } from "./favorite"


export default function MovieCard() {
    return (
        <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.card}>
            <View style={styles.imagePlaceholder}>
                <Image source={{ uri: "https://static.posters.cz/image/750webp/198201.webp" }} style={styles.image} resizeMode="cover"></Image>
                <Favorite />
            </View>
            <View style={styles.body}>
                <View style={styles.headerRow}>
                    <View style={styles.headerText}>
                        <Text style={styles.title}>Title</Text>
                        <Text style={styles.eyebrow}>Category</Text>
                        <Text style={styles.desc}>Description</Text>
                    </View>
                    <Text style={styles.price}>Price</Text>
                </View>
            </View>
            <Button title={"Buy Now"} style={{ marginTop: 10}}></Button>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: "gray",
        backgroundColor: "black",
        borderRadius: 16,
        overflow: "hidden",
        margin: 10,
        padding: 16
    },
    imagePlaceholder: {
        height: 260,
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: 12,
    },
    image: {
        width: "100%",
        height: "100%",
         overflow: "hidden",
         borderRadius: 12,
        
    },
    body: { padding: 20, gap: 4 },
    headerRow: { flexDirection: "row", justifyContent: "space-between", gap: 6 },
    headerText: {
        flex: 1,
    },
    eyebrow: {
        fontSize: 11, letterSpacing: 1, color: "#A8A8A8",
    },
    price: {
        fontSize: 18, color: "#A8A8A8",
    },
    desc: {
        fontSize: 12
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white"
    }

})