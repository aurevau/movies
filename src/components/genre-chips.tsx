import { Genre } from "@/domain/genre";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
    genres: Genre[];
    selected: number | null;
    onSelect: (id: number | null) => void;
};

export function GenreChips({ genres, selected, onSelect }: Props) {
    const options = [{ id: null, name: "Alla" }, ...genres];
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.content}>
            {options.map((genre) => {
                const isActive = genre.id === selected;
                return (
                    <TouchableOpacity
                        key={genre.id ?? "all"}
                        onPress={() => onSelect(genre.id)}
                        style={[styles.chip, isActive && styles.chipActive]}>
                        <Text style={[styles.label, isActive && styles.labelActive]}>
                            {genre.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    content: { gap: 12, padding: 16 },
    wrapContent: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    chip: {
        borderWidth: 1,
        borderColor: "#A8A8A8",
        backgroundColor: "#1A1A1A",
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    chipActive: {
        borderColor: "#A8A8A8",
        backgroundColor: "#920013",
    },
    label: {
        fontSize: 12,
        color: "white"
    },
    labelActive: {
        fontWeight: "bold"
    }
})

