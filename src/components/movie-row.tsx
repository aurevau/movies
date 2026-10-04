import { Movie } from "@/domain/movie";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import MovieCard from "./movie-card";
import SectionHeader from "./section-header";

type Props = {
    title: string;
    movies: Movie[];
    loading: boolean;
    error: string | null;
    onSeeAll?: () => void;
};

export default function MovieRow({ title, movies, loading, error }: Props) {
    return (
        <View style={{ marginVertical: 20 }}>
            <SectionHeader title={title} />
            {loading && <ActivityIndicator style={{ marginTop: 16 }} />}
            {error && <Text style={{ margin: 16, color: "white" }} />}
            {!loading && !error && (
                <FlatList data={movies.slice(0, 10)}
                    keyExtractor={(movie) => String(movie.id)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        gap: 12
                    }}
                    renderItem={({ item }) => <MovieCard movie={item} />
                    } />
            )}
        </View>
    )
}