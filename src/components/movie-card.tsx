import { Movie } from "@/domain/movie";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./button";
import { Favorite } from "./favorite";


const IMAGE_BASE = "https://image.tmdb.org/t/p/w342";
export default function MovieCard({ movie }: {
    movie: Movie
}) {
    const today = new Date().toISOString().slice(0, 10);
    const isUpcoming = movie.release_date > today;
    const router = useRouter();

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
                router.push({
                    pathname: "/movie-details",
                    params: { movie: String(movie.id)},
                })
            }
        >
            <View style={styles.card}>
                <View style={styles.imagePlaceholder}>
                    <Image source={{ uri: `${IMAGE_BASE}${movie.poster_path}` }} style={styles.image} resizeMode="cover"></Image>
                    <Favorite />
                </View>
                <View style={styles.body}>
                    <View style={styles.headerRow}>
                        <View style={styles.headerText}>
                            <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                <Ionicons name="star" size={14} color="yellow" />
                                <Text style={{ color: "white", fontSize: 13 }}>{movie.vote_average.toFixed(1)}</Text>
                            </View>
                            <Text style={styles.eyebrow}>Genre</Text>
                            <Text style={styles.desc}>Description</Text>
                        </View>
                        <Text style={styles.price}>Price</Text>
                    </View>
                </View>
                <Button title={isUpcoming ? "Kommer Snart" : "Köp nu"} disabled={isUpcoming} style={{ marginTop: 10 }}></Button>
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
        padding: 16,
        width: 340,
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