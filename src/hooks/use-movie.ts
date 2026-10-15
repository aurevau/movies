import { Movie } from "@/domain/movie";
import { useEffect, useState } from "react";

export const useMovieList = (fetcher: () => Promise<Movie[]>,  deps: unknown[] = []) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false 
        setLoading(true);
        setError(null);

        fetcher()
        .then((result) => {
            if(!cancelled) setMovies(result);
        })
        .catch((error) => {
            if (!cancelled) setError(error instanceof Error ? error.message : "Something went wrong");
        })
        .finally(() => {
            if (!cancelled) setLoading(false);
        });
        return () => {
            cancelled = true;
        };
    }, deps);


    return {movies, loading, error}
};