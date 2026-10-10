import { Movie } from "@/domain/movie";
import { formatPrice, getPrice } from "@/domain/pricing";
import { useCart } from "@/store/cart";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./button";
import { Favorite } from "./favorite";


const IMAGE_BASE = "https://image.tmdb.org/t/p/w342";
export default function MovieCard({ movie }: {
    movie: Movie
}) {
    const price = getPrice(movie);
    const router = useRouter();
    const addToCart = useCart((s) => s.addToCart);

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
                router.push({
                    pathname: "/movie-details",
                    params: { movie: String(movie.id) },
                })
            }
        >
            <View style={styles.card}>
                <View style={styles.imagePlaceholder}>
                    <Image source={{ uri: `${IMAGE_BASE}${movie.poster_path}` }} style={styles.image} resizeMode="cover"></Image>
                    <Favorite movie={movie} />
                </View>
                <View style={styles.body}>
                    <View style={styles.headerRow}>
                        <View style={styles.headerText}>
                            <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                <Ionicons name="star" size={14} color="yellow" />
                                <Text style={{ color: "white", fontSize: 13 }}>{movie.vote_average.toFixed(1)}</Text>
                            </View>
                            <Text style={styles.price}>{formatPrice(price)}</Text>

                        </View>
                    </View>
                </View>
                <Button title={"Köp nu"} onPress={() => addToCart(movie, price)} style={{ marginTop: 10 }}></Button>
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
        justifyContent: "center"
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
    price: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: "bold",
        color: "#A8A8A8",
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white"
    }

})