import { Movie } from "@/domain/movie";
import { useEffect, useState } from "react";

export const useMovieList = (fetcher: () => Promise<Movie[]>) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetcher()
        .then(setMovies)
        .catch((error) => setError(error instanceof Error ? error.message : "Something went wrong"))
        .finally(() => setLoading(false));
    }, []);

    return {movies, loading, error}
}