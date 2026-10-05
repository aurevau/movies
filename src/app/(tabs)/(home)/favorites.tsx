import MovieCard from "@/components/movie-card";
import { useFavorites } from "@/store/favorites";
import { FlatList, Text, View } from "react-native";

export default function FavoritesScreen () {
    const favorites = useFavorites((s) => s.favorites);

    if (favorites.length === 0) {
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <Text style={{color: "white"}}>Lägg till favoriter</Text>
          </View>
    }

    return (
         <FlatList data={favorites}
         keyExtractor={(m) => String(m.id)}
         contentContainerStyle={{padding: 16, gap: 12}}
         renderItem={({item}) => <MovieCard movie={item}/>}/>
    )
}