import Button from "@/components/button";
import { Favorite } from "@/components/favorite";
import { Movie } from "@/domain/movie";
import { formatPrice, getPrice } from "@/domain/pricing";
import { getMovie } from "@/services/api";
import { useCart } from "@/store/cart";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w780";

export default function MovieDetailsScreen() {
    const { movie: id } = useLocalSearchParams<{ movie: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const addToCart = useCart((s) => s.addToCart);



    useEffect(() => {
        let cancelled = false;
        getMovie(Number(id))
            .then((m) => { if (!cancelled) setMovie(m); })
            .catch((e) => { if (!cancelled) setError(e instanceof Error ? e.message : "Something went wrong"); })
            .finally(() => { if (!cancelled) setLoading(false); })

        return () => { cancelled = true };
    }, [id]);


    if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

    if (error || !movie) return <Text style={{ flex: 1 }} />;

    const price = getPrice(movie);
    return (
        <ScrollView>
            <View>
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
                        </View>
                        <Text style={styles.price}>{formatPrice(price)}</Text>
                    </View>
                </View>
                <Button title="Köp nu" onPress={() => addToCart(movie, price)}></Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imagePlaceholder: {
        alignSelf: "center",
        backgroundColor: "gray",
        borderRadius: 12,
        width: "100%",
        aspectRatio: 2 / 3,

    },
    image: {
        width: "100%",
        height: "100%",

    },
    body: { padding: 20, gap: 4 },
    headerRow: { flexDirection: "row", justifyContent: "space-between", gap: 6 },
    headerText: {
        flex: 1,
    },
    price: {
        fontSize: 18, color: "#A8A8A8",
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white"
    }

})