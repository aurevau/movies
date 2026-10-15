import { Movie } from "@/domain/movie";
import { useFavorites } from "@/store/favorites";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

export function Favorite({movie}: {movie: Movie}) {
    const isFavorite = useFavorites((s) => s.favorites.some((m) => m.id === movie.id));
    const toggle = useFavorites((s) => s.toggle);

    return (
        <TouchableOpacity
        style={styles.button} onPress={() => toggle(movie)} hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
             <Ionicons name =  {isFavorite ? "heart" : "heart-outline"} color={isFavorite ? "#920013" : "#F6F6F6"} size={22}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        top: 8,
        right: 8,
        zIndex: 1,
        width: 42,
        height: 42,
        borderRadius: 999,
        backgroundColor: "#1A1A1A",
        alignItems: "center",
        justifyContent: "center",

    },
})