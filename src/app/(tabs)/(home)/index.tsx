import { GenreChips } from "@/components/genre-chips";
import MovieCard from "@/components/movie-card";
import MovieRow from "@/components/movie-row";
import SectionHeader from "@/components/section-header";
import { useGenres } from "@/hooks/use-genre";
import { useMovieList } from "@/hooks/use-movie";
import { discoverMovies, getTopRatedMovies } from "@/services/api";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";


export default function HomeScreen() {
  const discover = useMovieList(() => discoverMovies({ sortBy: "popularity.desc" }));
  const topRated = useMovieList(getTopRatedMovies);

  const genres = useGenres();
  const [selected, setSelected] = useState<number | null>(null);

  const genreMovies = useMovieList(() => discoverMovies({ genreIds: selected ? [selected] : [] }), [selected]);

  return (
    <FlatList
      data={genreMovies.movies}
      keyExtractor={(movie) => String(movie.id)}
      renderItem={({ item }) => (
        <View style={{ alignItems: "center", opacity: genreMovies.loading ? 0.4 : 1 }}>
          <MovieCard movie={item} />
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 32 }}
      contentInsetAdjustmentBehavior="automatic"
      ListHeaderComponent={
        <>
          <MovieRow title="Upptäck" {...discover} />
          <MovieRow title="Högst betyg" {...topRated} />

          <SectionHeader title="Genrer"/>
          <GenreChips genres={genres} selected={selected} onSelect={setSelected}/>
          {genreMovies.loading && <ActivityIndicator style={{marginVertical: 12}}/>}
        </>
      }
      ListEmptyComponent={
        !genreMovies.loading ? (
          <Text style={{color: "white", textAlign: "center", marginTop: 32}}>
            {genreMovies.error ?? "Inga filmer hittades"}
          </Text>
        ) : null 
      }
      />
  );
}


