import MovieRow from "@/components/movie-row";
import { useMovieList } from "@/hooks/use-movie";
import { discoverMovies, getTopRatedMovies, getUpcoming } from "@/services/api";
import { useCurrentUser } from "@/store/user";
import { useEffect } from "react";
import { ScrollView } from "react-native";


export default function HomeScreen() {
  const discover = useMovieList(() => discoverMovies({ sortBy: "popularity,desc" }));
  const topRated = useMovieList(getTopRatedMovies);
  const upcoming = useMovieList(getUpcoming);

  const user = useCurrentUser();
  const orders = user?.orders ?? [];

  useEffect(() => {
    for (const order of orders) {
      console.log(order)
    }
  }, [orders])


  return (
    <ScrollView>

      <MovieRow title="Upptäck" {...discover} />
      <MovieRow title="Högst betyg" {...topRated} />
      <MovieRow title="Kommer snart" {...upcoming} />

    </ScrollView>
  )
}


