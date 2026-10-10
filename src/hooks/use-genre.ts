import { Genre } from "@/domain/genre";
import { getGenres } from "@/services/api";
import { useEffect, useState } from "react";

export const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        getGenres().then(setGenres).catch(() => setGenres([]));
    }, []);

    return genres;
}